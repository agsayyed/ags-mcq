from PIL import Image, ImageDraw, ImageFont, ImageOps
import os
import argparse

def get_default_font(size=36):
    try:
        # Try different system fonts
        font_paths = [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",  # Linux
            "/usr/share/fonts/TTF/DejaVuSans.ttf",              # Some Linux
            "/System/Library/Fonts/Helvetica.ttc",              # macOS
            "C:\\Windows\\Fonts\\arial.ttf"                     # Windows
        ]
        
        for font_path in font_paths:
            if os.path.exists(font_path):
                print(f"Using font: {font_path}")
                return ImageFont.truetype(font_path, size)
        
        # If no system fonts found, use default
        print("Using default font")
        return ImageFont.load_default()
    
    except Exception as e:
        print(f"Error loading font: {e}")
        return ImageFont.load_default()

def draw_diagonal_stripes(draw, position, stripe_width=5, stripe_color=(255, 255, 255, 128)):
    x0, y0, x1, y1 = position
    for i in range(x0, x1, stripe_width * 2):
        draw.line([(i, y0), (i + stripe_width, y1)], fill=stripe_color, width=stripe_width)

def draw_circle_pattern(draw, position, circle_radius=5, red_color=(255, 0, 0, 128), yellow_color=(255, 255, 0, 128)):
    x0, y0, x1, y1 = position
    for x in range(x0, x1, circle_radius * 2):
        for y in range(y0, y1, circle_radius * 2):
            draw.ellipse([(x, y), (x + circle_radius, y + circle_radius)], fill=red_color)
            draw.ellipse([(x + circle_radius // 2, y + circle_radius // 2), 
                          (x + 3 * circle_radius // 2, y + 3 * circle_radius // 2)], fill=yellow_color)

def add_copyright(input_path, output_path, text="© 2024 YourName", style="rectangle"):
    # Open the image
    image = Image.open(input_path)
    
    # Add border
    border_color = "#Fac51c"
    border_width = 10
    image = ImageOps.expand(image, border=border_width, fill=border_color)
    
    # Prepare to draw on the new image
    draw = ImageDraw.Draw(image)
    
    # Load font
    font = get_default_font(size=24)  # Reduced font size
    print(f"Font size: {font.size}")
    
    # Calculate text size for positioning
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_width = text_bbox[2] - text_bbox[0]
    text_height = text_bbox[3] - text_bbox[1]
    print(f"Text size: {text_width}x{text_height}")
    
    # Position text in bottom right with padding
    padding = 10  # Adjusted padding
    text_position = (image.width - text_width - padding, 
                     image.height - text_height - padding)
    print(f"Text position: {text_position}")
    
    # Draw background based on style
    rectangle_position = (text_position[0] - padding, text_position[1] - padding, 
                          text_position[0] + text_width + padding, text_position[1] + text_height + padding)
    
    if style == "rectangle":
        draw.rectangle(rectangle_position, fill=(200, 200, 200, 128))  # Semi-transparent light gray background
    elif style == "rounded":
        draw.rounded_rectangle(rectangle_position, radius=10, fill=(200, 200, 200, 128))  # Rounded rectangle
    elif style == "stripes":
        draw.rectangle(rectangle_position, fill=(200, 200, 200, 128))  # Base semi-transparent light gray background
        draw_diagonal_stripes(draw, rectangle_position)  # Add diagonal stripes
    elif style == "circles":
        draw_circle_pattern(draw, rectangle_position)  # Add circle pattern
    
    # Draw text on top of the background
    draw.text(text_position, text, font=font, fill="black")
    print(f"Text drawn: {text}")
    
    # Save the modified image
    image.save(output_path)
    print(f"Image saved to: {output_path}")


def main():
    parser = argparse.ArgumentParser(description='Add copyright and border to images')
    parser.add_argument('input_path', help='Path to the input image or directory')
    parser.add_argument('--text', default='© 2024 Ghafoor', help='Copyright text to add')
    parser.add_argument('--style', choices=['rectangle', 'rounded', 'stripes', 'circles'], default='rectangle', help='Style of the watermark background')
    args = parser.parse_args()

    if os.path.isfile(args.input_path):
        # Single file processing
        input_dir = os.path.dirname(args.input_path)
        basename = os.path.basename(args.input_path)
        # Create output directory next to the input file
        output_dir = os.path.join(input_dir, "output")
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, basename)
        add_copyright(args.input_path, output_path, args.text, args.style)
    elif os.path.isdir(args.input_path):
        # Create output directory inside the input directory
        output_dir = os.path.join(args.input_path, "output")
        os.makedirs(output_dir, exist_ok=True)
        # Directory processing
        for filename in os.listdir(args.input_path):
            if filename.endswith((".png", ".jpg", ".webp")):
                input_file = os.path.join(args.input_path, filename)
                output_file = os.path.join(output_dir, filename)
                add_copyright(input_file, output_file, args.text, args.style)

if __name__ == "__main__":
    main()
