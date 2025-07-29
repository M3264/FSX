#!/usr/bin/env python3
"""
Directory Structure Generator with Code Line Counter
Creates a beautiful structure.md file showing the directory tree
while skipping node_modules contents and other common ignore patterns.
Also counts lines of code across the project.
"""

import os
import sys
from pathlib import Path
from datetime import datetime
from collections import defaultdict

def should_ignore(path_name, is_dir=False):
    """
    Determine if a file or directory should be ignored.
    """
    ignore_patterns = {
        # Version control
        '.git', '.svn', '.hg',
        # Dependencies
        'node_modules', '__pycache__', '.pytest_cache',
        # IDE and editor files
        '.vscode', '.idea', '.vs', '*.swp', '*.swo',
        # Build outputs
        'dist', 'build', 'out', 'target',
        # Logs and temp files
        '*.log', 'logs', 'tmp', 'temp',
        # OS files
        '.DS_Store', 'Thumbs.db',
        # Environment files
        '.env', '.env.local', '.env.*.local',
        # Lock files
        'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'poetry.lock',
        'Pipfile.lock', 'composer.lock', 'Gemfile.lock'
    }
    
    # Special handling for node_modules - show it but don't traverse
    if path_name == 'node_modules' and is_dir:
        return False  # Don't ignore it completely, just don't traverse
    
    return path_name in ignore_patterns or path_name.startswith('.')

def should_count_lines(file_path):
    """
    Determine if a file should be counted for lines of code.
    """
    # Skip if it's an ignored file
    if should_ignore(file_path.name):
        return False
    
    # Only count code files
    code_extensions = {
        '.py', '.js', '.ts', '.jsx', '.tsx', '.html', '.css', '.scss', '.sass',
        '.java', '.c', '.cpp', '.h', '.hpp', '.cs', '.php', '.rb', '.go',
        '.rs', '.swift', '.kt', '.scala', '.clj', '.elm', '.hs', '.ml',
        '.vue', '.svelte', '.sql', '.r', '.m', '.pl', '.sh', '.bash',
        '.ps1', '.yaml', '.yml', '.json', '.xml', '.toml', '.ini',
        '.md', '.rst', '.tex', '.lua', '.dart', '.jl', '.nim'
    }
    
    return file_path.suffix.lower() in code_extensions

def count_file_lines(file_path):
    """
    Count lines in a file, handling various encodings.
    """
    try:
        # Try UTF-8 first
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
            total_lines = len(lines)
            blank_lines = sum(1 for line in lines if line.strip() == '')
            comment_lines = count_comment_lines(lines, file_path.suffix)
            code_lines = total_lines - blank_lines - comment_lines
            
            return {
                'total': total_lines,
                'code': max(0, code_lines),
                'blank': blank_lines,
                'comment': comment_lines
            }
    except UnicodeDecodeError:
        # Try latin-1 as fallback
        try:
            with open(file_path, 'r', encoding='latin-1') as f:
                lines = f.readlines()
                total_lines = len(lines)
                blank_lines = sum(1 for line in lines if line.strip() == '')
                comment_lines = count_comment_lines(lines, file_path.suffix)
                code_lines = total_lines - blank_lines - comment_lines
                
                return {
                    'total': total_lines,
                    'code': max(0, code_lines),
                    'blank': blank_lines,
                    'comment': comment_lines
                }
        except:
            return None
    except:
        return None

def count_comment_lines(lines, extension):
    """
    Count comment lines based on file extension.
    """
    comment_count = 0
    ext = extension.lower()
    
    # Comment patterns for different languages
    single_line_comments = {
        '.py': '#',
        '.js': '//',
        '.ts': '//',
        '.jsx': '//',
        '.tsx': '//',
        '.java': '//',
        '.c': '//',
        '.cpp': '//',
        '.cs': '//',
        '.php': '//',
        '.go': '//',
        '.rs': '//',
        '.swift': '//',
        '.kt': '//',
        '.scala': '//',
        '.sql': '--',
        '.lua': '--',
        '.r': '#',
        '.sh': '#',
        '.bash': '#',
        '.ps1': '#',
        '.yaml': '#',
        '.yml': '#',
        '.toml': '#',
        '.ini': '#',
        '.rb': '#',
        '.pl': '#',
        '.dart': '//',
        '.jl': '#',
        '.nim': '#'
    }
    
    comment_char = single_line_comments.get(ext)
    if not comment_char:
        return 0
    
    for line in lines:
        stripped = line.strip()
        if stripped.startswith(comment_char):
            comment_count += 1
    
    return comment_count

def get_file_icon(file_path):
    """
    Get an appropriate icon for the file type.
    """
    icons = {
        # Programming languages
        '.py': '🐍',
        '.js': '📜',
        '.ts': '📘',
        '.jsx': '⚛️',
        '.tsx': '⚛️',
        '.html': '🌐',
        '.css': '🎨',
        '.scss': '🎨',
        '.json': '📋',
        '.xml': '📄',
        '.yaml': '⚙️',
        '.yml': '⚙️',
        
        # Documentation
        '.md': '📝',
        '.txt': '📄',
        '.pdf': '📕',
        '.doc': '📘',
        '.docx': '📘',
        
        # Images
        '.png': '🖼️',
        '.jpg': '🖼️',
        '.jpeg': '🖼️',
        '.gif': '🖼️',
        '.svg': '🎨',
        '.ico': '🖼️',
        
        # Archives
        '.zip': '📦',
        '.tar': '📦',
        '.gz': '📦',
        '.rar': '📦',
        
        # Config files
        '.config': '⚙️',
        '.conf': '⚙️',
        '.ini': '⚙️',
        '.toml': '⚙️',
        
        # Special files
        'package.json': '📦',
        'requirements.txt': '📋',
        'Dockerfile': '🐳',
        'docker-compose.yml': '🐳',
        'Makefile': '🔧',
        'README.md': '📖',
        'LICENSE': '📜',
        '.gitignore': '🚫',
    }
    
    file_name = file_path.name.lower()
    suffix = file_path.suffix.lower()
    
    # Check for specific filenames first
    if file_name in icons:
        return icons[file_name]
    
    # Then check extensions
    if suffix in icons:
        return icons[suffix]
    
    return '📄'

def get_dir_icon(dir_name):
    """
    Get an appropriate icon for the directory.
    """
    icons = {
        'src': '📁',
        'lib': '📚',
        'bin': '⚙️',
        'docs': '📖',
        'test': '🧪',
        'tests': '🧪',
        'config': '⚙️',
        'static': '🌐',
        'public': '🌍',
        'assets': '🎨',
        'images': '🖼️',
        'img': '🖼️',
        'css': '🎨',
        'js': '📜',
        'scripts': '📜',
        'utils': '🔧',
        'components': '🧩',
        'pages': '📄',
        'views': '👁️',
        'models': '🏗️',
        'controllers': '🎛️',
        'services': '⚙️',
        'api': '🔌',
        'database': '🗄️',
        'db': '🗄️',
        'migrations': '🔄',
        'node_modules': '📦',
        '.git': '🔧',
        'build': '🏗️',
        'dist': '📦',
    }
    
    return icons.get(dir_name.lower(), '📂')

def generate_tree(root_path, prefix="", is_last=True, max_depth=None, current_depth=0, stats=None):
    """
    Generate the directory tree structure and collect statistics.
    """
    if stats is None:
        stats = {
            'total_files': 0,
            'total_dirs': 0,
            'lines_by_extension': defaultdict(lambda: {'total': 0, 'code': 0, 'blank': 0, 'comment': 0}),
            'files_by_extension': defaultdict(int),
            'total_lines': {'total': 0, 'code': 0, 'blank': 0, 'comment': 0}
        }
    
    if max_depth is not None and current_depth >= max_depth:
        return [], stats
    
    lines = []
    root = Path(root_path)
    
    if not root.exists():
        return ["❌ Path does not exist"], stats
    
    try:
        # Get all items and sort them (directories first, then files)
        items = []
        for item in root.iterdir():
            if not should_ignore(item.name, item.is_dir()):
                items.append(item)
        
        # Sort: directories first, then files, both alphabetically
        items.sort(key=lambda x: (not x.is_dir(), x.name.lower()))
        
        for i, item in enumerate(items):
            is_last_item = i == len(items) - 1
            
            # Create the tree connector
            connector = "└── " if is_last_item else "├── "
            
            if item.is_dir():
                icon = get_dir_icon(item.name)
                lines.append(f"{prefix}{connector}{icon} {item.name}/")
                stats['total_dirs'] += 1
                
                # Special handling for node_modules - don't traverse into it
                if item.name == 'node_modules':
                    lines.append(f"{prefix}{'    ' if is_last_item else '│   '}    📝 (contents hidden)")
                else:
                    # Add subdirectory contents
                    extension = "    " if is_last_item else "│   "
                    sublines, stats = generate_tree(
                        item, 
                        prefix + extension, 
                        is_last_item, 
                        max_depth, 
                        current_depth + 1,
                        stats
                    )
                    lines.extend(sublines)
            else:
                icon = get_file_icon(item)
                file_size = ""
                line_info = ""
                
                try:
                    size = item.stat().st_size
                    if size > 1024 * 1024:  # > 1MB
                        file_size = f" ({size / (1024*1024):.1f}MB)"
                    elif size > 1024:  # > 1KB
                        file_size = f" ({size / 1024:.1f}KB)"
                    elif size > 0:
                        file_size = f" ({size}B)"
                except:
                    pass
                
                # Count lines for code files
                if should_count_lines(item):
                    line_count = count_file_lines(item)
                    if line_count:
                        ext = item.suffix.lower() or 'no_extension'
                        stats['lines_by_extension'][ext]['total'] += line_count['total']
                        stats['lines_by_extension'][ext]['code'] += line_count['code']
                        stats['lines_by_extension'][ext]['blank'] += line_count['blank']
                        stats['lines_by_extension'][ext]['comment'] += line_count['comment']
                        stats['files_by_extension'][ext] += 1
                        
                        stats['total_lines']['total'] += line_count['total']
                        stats['total_lines']['code'] += line_count['code']
                        stats['total_lines']['blank'] += line_count['blank']
                        stats['total_lines']['comment'] += line_count['comment']
                        
                        if line_count['total'] > 0:
                            line_info = f" [{line_count['total']} lines]"
                
                stats['total_files'] += 1
                lines.append(f"{prefix}{connector}{icon} {item.name}{file_size}{line_info}")
    
    except PermissionError:
        lines.append(f"{prefix}❌ Permission denied")
    except Exception as e:
        lines.append(f"{prefix}❌ Error: {str(e)}")
    
    return lines, stats

def create_structure_md(root_path="."):
    """
    Create a beautiful structure.md file with code statistics.
    """
    root = Path(root_path).resolve()
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    # Generate the tree and collect statistics
    tree_lines, stats = generate_tree(root_path)
    
    # Create the markdown content
    content = f"""# 📁 Project Structure & Code Statistics

**Generated on:** {timestamp}  
**Root Directory:** `{root}`

## 📊 Code Statistics Summary

| Metric | Count |
|--------|-------|
| 📁 Total Directories | {stats['total_dirs']:,} |
| 📄 Total Files | {stats['total_files']:,} |
| 📝 Total Lines | {stats['total_lines']['total']:,} |
| 💻 Code Lines | {stats['total_lines']['code']:,} |
| 🔹 Blank Lines | {stats['total_lines']['blank']:,} |
| 💬 Comment Lines | {stats['total_lines']['comment']:,} |

## 🔍 Lines of Code by Language

"""
    
    # Sort extensions by total lines (descending)
    sorted_extensions = sorted(
        stats['lines_by_extension'].items(),
        key=lambda x: x[1]['total'],
        reverse=True
    )
    
    if sorted_extensions:
        content += "| Language | Files | Total Lines | Code Lines | Blank Lines | Comment Lines |\n"
        content += "|----------|-------|-------------|------------|-------------|---------------|\n"
        
        for ext, line_stats in sorted_extensions:
            if line_stats['total'] > 0:
                file_count = stats['files_by_extension'][ext]
                lang_name = get_language_name(ext)
                content += f"| {lang_name} | {file_count:,} | {line_stats['total']:,} | {line_stats['code']:,} | {line_stats['blank']:,} | {line_stats['comment']:,} |\n"
    else:
        content += "*No code files found.*\n"
    
    content += f"""

## 🌳 Directory Tree

```
{root.name}/
"""
    
    # Add the tree structure
    for line in tree_lines:
        content += line + "\n"
    
    content += """```

## 📋 Legend

| Icon | Type | Description |
|------|------|-------------|
| 📂 | Directory | Regular folder |
| 📁 | Directory | Source code folder |
| 📦 | Directory/File | Package or archive |
| 🐍 | File | Python file |
| 📜 | File | JavaScript file |
| 📘 | File | TypeScript file |
| ⚛️ | File | React component |
| 🌐 | File | HTML file |
| 🎨 | File | CSS/SCSS file |
| 📝 | File | Markdown file |
| 📋 | File | JSON file |
| ⚙️ | File | Configuration file |
| 🖼️ | File | Image file |
| 📖 | File | Documentation |
| 🧪 | Directory | Test files |
| 🔧 | File | Build/utility file |

## 📝 Notes

- `node_modules` contents are hidden for clarity
- Hidden files and directories (starting with `.`) are not shown
- Lock files (package-lock.json, yarn.lock, etc.) are excluded from line counts
- File sizes are shown for files larger than 1KB
- Line counts are shown in brackets for code files
- Comment detection is basic and may not be 100% accurate for all languages
- Generated using Python directory structure generator

---
*This structure was automatically generated. To regenerate, run the script again.*
"""
    
    # Write to file
    output_file = Path(root_path) / "structure.md"
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ Structure file created: {output_file}")
    print(f"📊 Total items processed: {len(tree_lines)}")
    print(f"💻 Total lines of code: {stats['total_lines']['code']:,}")
    print(f"📝 Total lines (including blanks/comments): {stats['total_lines']['total']:,}")
    
    return output_file

def get_language_name(extension):
    """
    Get a human-readable language name from file extension.
    """
    language_map = {
        '.py': 'Python',
        '.js': 'JavaScript',
        '.ts': 'TypeScript',
        '.jsx': 'React (JSX)',
        '.tsx': 'React (TSX)',
        '.html': 'HTML',
        '.css': 'CSS',
        '.scss': 'SCSS',
        '.sass': 'Sass',
        '.java': 'Java',
        '.c': 'C',
        '.cpp': 'C++',
        '.h': 'C Header',
        '.hpp': 'C++ Header',
        '.cs': 'C#',
        '.php': 'PHP',
        '.rb': 'Ruby',
        '.go': 'Go',
        '.rs': 'Rust',
        '.swift': 'Swift',
        '.kt': 'Kotlin',
        '.scala': 'Scala',
        '.clj': 'Clojure',
        '.elm': 'Elm',
        '.hs': 'Haskell',
        '.ml': 'OCaml',
        '.vue': 'Vue.js',
        '.svelte': 'Svelte',
        '.sql': 'SQL',
        '.r': 'R',
        '.m': 'Objective-C',
        '.pl': 'Perl',
        '.sh': 'Shell',
        '.bash': 'Bash',
        '.ps1': 'PowerShell',
        '.yaml': 'YAML',
        '.yml': 'YAML',
        '.json': 'JSON',
        '.xml': 'XML',
        '.toml': 'TOML',
        '.ini': 'INI',
        '.md': 'Markdown',
        '.rst': 'reStructuredText',
        '.tex': 'LaTeX',
        '.lua': 'Lua',
        '.dart': 'Dart',
        '.jl': 'Julia',
        '.nim': 'Nim',
        'no_extension': 'No Extension'
    }
    
    return language_map.get(extension, extension.upper().replace('.', '') if extension else 'Unknown')

def main():
    """
    Main function to run the script.
    """
    print("🌳 Directory Structure Generator with Code Counter")
    print("=" * 50)
    
    # Get the root path from command line argument or use current directory
    root_path = sys.argv[1] if len(sys.argv) > 1 else "."
    
    try:
        output_file = create_structure_md(root_path)
        print(f"\n🎉 Successfully created structure.md with code statistics!")
        print(f"📂 Location: {output_file}")
        print(f"\n💡 Tip: Open structure.md in your markdown viewer to see the beautiful formatting!")
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()