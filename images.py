#!/usr/bin/env python3
"""
Image Download and WebP Conversion Script
Downloads images from URLs and converts them to WebP format
"""

import os
import requests
import hashlib
from PIL import Image
from io import BytesIO
import urllib.parse

# Configuration
OUTPUT_DIR = "src/server/images"
WEBP_QUALITY = 85
TIMEOUT = 30

# List of images to download
IMAGES = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", 
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    "https://files.catbox.moe/b8is2m.jpeg"
]

def create_output_directory():
    """Create the output directory if it doesn't exist"""
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print(f"✓ Created/verified directory: {OUTPUT_DIR}")

def generate_filename(url, index):
    """Generate a descriptive filename based on URL content"""
    # Extract meaningful parts from URL
    parsed = urllib.parse.urlparse(url)
    
    # For Unsplash images, use the photo ID
    if "unsplash.com" in url:
        path_parts = parsed.path.split('/')
        if len(path_parts) > 1:
            photo_id = path_parts[-1]
            return f"unsplash-{photo_id}.webp"
    
    # For other URLs, create a hash-based name
    elif "catbox.moe" in parsed.netloc:
        return "fcc-project.webp"
    
    # Fallback: use index and URL hash
    url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
    return f"image-{index + 1}-{url_hash}.webp"

def download_image(url, timeout=TIMEOUT):
    """Download image from URL and return PIL Image object"""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    try:
        print(f"📥 Downloading: {url}")
        response = requests.get(url, headers=headers, timeout=timeout)
        response.raise_for_status()
        
        # Open image with PIL
        image = Image.open(BytesIO(response.content))
        
        # Convert to RGB if necessary (for WebP compatibility)
        if image.mode in ('RGBA', 'P', 'LA'):
            # Create white background for transparent images
            background = Image.new('RGB', image.size, (255, 255, 255))
            if image.mode == 'P':
                image = image.convert('RGBA')
            background.paste(image, mask=image.split()[-1] if image.mode in ('RGBA', 'LA') else None)
            image = background
        elif image.mode != 'RGB':
            image = image.convert('RGB')
            
        return image
        
    except requests.RequestException as e:
        print(f"❌ Failed to download {url}: {e}")
        return None
    except Exception as e:
        print(f"❌ Failed to process image from {url}: {e}")
        return None

def convert_to_webp(image, output_path, quality=WEBP_QUALITY):
    """Convert PIL Image to WebP format"""
    try:
        # Optimize the image size while maintaining quality
        image.save(
            output_path, 
            'WEBP', 
            quality=quality,
            optimize=True,
            method=6  # Better compression
        )
        
        # Get file size for reporting
        size_mb = os.path.getsize(output_path) / (1024 * 1024)
        print(f"✅ Saved: {output_path} ({size_mb:.2f} MB)")
        return True
        
    except Exception as e:
        print(f"❌ Failed to save WebP: {e}")
        return False

def process_images():
    """Main function to download and convert all images"""
    print("🚀 Starting image download and conversion process...")
    
    # Create output directory
    create_output_directory()
    
    successful_conversions = []
    failed_conversions = []
    
    for i, url in enumerate(IMAGES):
        print(f"\n📸 Processing image {i + 1}/{len(IMAGES)}")
        
        # Generate filename
        filename = generate_filename(url, i)
        output_path = os.path.join(OUTPUT_DIR, filename)
        
        # Skip if file already exists
        if os.path.exists(output_path):
            print(f"⏭️  Skipping (already exists): {filename}")
            successful_conversions.append((url, filename))
            continue
        
        # Download image
        image = download_image(url)
        if image is None:
            failed_conversions.append((url, "Download failed"))
            continue
        
        # Convert to WebP
        if convert_to_webp(image, output_path):
            successful_conversions.append((url, filename))
        else:
            failed_conversions.append((url, "WebP conversion failed"))
    
    # Print summary
    print(f"\n{'='*60}")
    print("📊 CONVERSION SUMMARY")
    print(f"{'='*60}")
    print(f"✅ Successful: {len(successful_conversions)}")
    print(f"❌ Failed: {len(failed_conversions)}")
    
    if successful_conversions:
        print(f"\n🎉 Successfully converted images:")
        for url, filename in successful_conversions:
            print(f"   • {filename}")
    
    if failed_conversions:
        print(f"\n💥 Failed conversions:")
        for url, error in failed_conversions:
            print(f"   • {url} - {error}")
    
    # Generate mapping for React component
    print(f"\n📝 URL to filename mapping:")
    for url, filename in successful_conversions:
        print(f"   '{url}' -> '/images/{filename}'")

if __name__ == "__main__":
    try:
        process_images()
        print("\n🎯 Script completed successfully!")
    except KeyboardInterrupt:
        print("\n⚠️  Script interrupted by user")
    except Exception as e:
        print(f"\n💥 Unexpected error: {e}")