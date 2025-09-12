#!/usr/bin/env python3
"""
QR Code PDF Generator for BG Stats App

This script generates printable PDF pages containing 3x3 grids of QR codes for the BG Stats app.
Each QR code encodes a URL for logging game plays, with the center cell displaying the BG Stats logo.

Usage:
    python generate_qr_pdf.py input.csv output.pdf

Requirements:
    - qrcode
    - reportlab
    - Pillow
"""

import argparse
import csv
import sys
import os
import tempfile
from urllib.parse import quote
import qrcode
from PIL import Image, ImageDraw, ImageFont
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from io import BytesIO


class QRCodePDFGenerator:
    def __init__(self, logo_path=None):
        self.logo_path = logo_path
        self.page_width, self.page_height = letter
        self.margin = 0.5 * inch
        self.grid_size = 3
        self.qr_size = 120  # pixels
        self.cell_width = (self.page_width - 2 * self.margin) / self.grid_size
        self.cell_height = (self.page_height - 2 * self.margin) / self.grid_size
        
    def create_qr_code(self, game_id, game_name):
        """Create a QR code for a specific game."""
        # URL encode the location parameter
        location = quote("Valhalla Board Game Cafe")
        url = f"https://app.bgstatsapp.com/addPlay.html?gameId={game_id}&location={location}"
        
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=4,
            border=2,
        )
        qr.add_data(url)
        qr.make(fit=True)
        
        # Create QR code image
        qr_img = qr.make_image(fill_color="black", back_color="white")
        qr_img = qr_img.resize((self.qr_size, self.qr_size))
        
        return qr_img
    
    def create_logo_placeholder(self):
        """Create a placeholder logo image if no logo file is provided."""
        img = Image.new('RGB', (self.qr_size, self.qr_size), color='white')
        draw = ImageDraw.Draw(img)
        
        # Draw a simple placeholder
        draw.rectangle([10, 10, self.qr_size-10, self.qr_size-10], 
                      outline='black', width=2)
        
        # Try to add text
        try:
            font = ImageFont.load_default()
            text = "BG Stats\nLogo"
            bbox = draw.textbbox((0, 0), text, font=font)
            text_width = bbox[2] - bbox[0]
            text_height = bbox[3] - bbox[1]
            x = (self.qr_size - text_width) // 2
            y = (self.qr_size - text_height) // 2
            draw.text((x, y), text, fill='black', font=font)
        except:
            # Fallback if font loading fails
            draw.text((30, 50), "BG Stats", fill='black')
            draw.text((40, 70), "Logo", fill='black')
        
        return img
    
    def load_logo(self):
        """Load the BG Stats logo image."""
        if self.logo_path and os.path.exists(self.logo_path):
            try:
                logo = Image.open(self.logo_path)
                logo = logo.resize((self.qr_size, self.qr_size))
                return logo
            except Exception as e:
                print(f"Warning: Could not load logo from {self.logo_path}: {e}")
                print("Using placeholder logo instead.")
        
        return self.create_logo_placeholder()
    
    def save_temp_image(self, img, prefix="temp"):
        """Save PIL Image to temporary file for ReportLab."""
        import tempfile
        temp_file = tempfile.NamedTemporaryFile(delete=False, suffix='.png', prefix=prefix)
        img.save(temp_file.name, format='PNG')
        temp_file.close()
        return temp_file.name
    
    def add_text_to_pdf(self, c, text, x, y, font_size=10, center=True):
        """Add text to the PDF canvas."""
        c.setFont("Helvetica", font_size)
        if center:
            text_width = c.stringWidth(text, "Helvetica", font_size)
            x = x - text_width / 2
        c.drawString(x, y, text)
    
    def generate_pdf(self, games_data, output_path):
        """Generate the PDF with QR codes."""
        c = canvas.Canvas(output_path, pagesize=letter)
        logo_img = self.load_logo()
        temp_files = []  # Track temp files for cleanup
        
        games_per_page = 8  # 9 cells - 1 center logo = 8 games
        page_num = 0
        
        try:
            for page_start in range(0, len(games_data), games_per_page):
                if page_num > 0:
                    c.showPage()  # Start new page
                
                page_games = games_data[page_start:page_start + games_per_page]
                page_temp_files = self.draw_page(c, page_games, logo_img)
                temp_files.extend(page_temp_files)
                page_num += 1
            
            c.save()
            print(f"PDF generated successfully: {output_path}")
            print(f"Total pages: {page_num}")
            print(f"Total games: {len(games_data)}")
            
        finally:
            # Clean up temporary files
            for temp_file in temp_files:
                try:
                    os.unlink(temp_file)
                except:
                    pass
    
    def draw_page(self, c, games, logo_img):
        """Draw a single page with 3x3 grid."""
        temp_files = []
        game_index = 0
        
        for row in range(self.grid_size):
            for col in range(self.grid_size):
                # Calculate position
                x = self.margin + col * self.cell_width
                y = self.page_height - self.margin - (row + 1) * self.cell_height
                cell_center_x = x + self.cell_width / 2
                cell_center_y = y + self.cell_height / 2
                
                # Center cell (row=1, col=1) gets the logo
                if row == 1 and col == 1:
                    temp_file = self.draw_logo_cell(c, logo_img, cell_center_x, cell_center_y)
                    if temp_file:
                        temp_files.append(temp_file)
                elif game_index < len(games):
                    game_id, game_name = games[game_index]
                    temp_file = self.draw_game_cell(c, game_id, game_name, cell_center_x, cell_center_y)
                    if temp_file:
                        temp_files.append(temp_file)
                    game_index += 1
        
        return temp_files
    
    def draw_logo_cell(self, c, logo_img, center_x, center_y):
        """Draw the center logo cell."""
        temp_file = self.save_temp_image(logo_img, "logo")
        
        # Position the logo
        img_x = center_x - self.qr_size / 2
        img_y = center_y - self.qr_size / 2
        
        c.drawImage(temp_file, img_x, img_y, width=self.qr_size, height=self.qr_size)
        return temp_file
    
    def draw_game_cell(self, c, game_id, game_name, center_x, center_y):
        """Draw a cell with QR code and text for a game."""
        # Create QR code
        qr_img = self.create_qr_code(game_id, game_name)
        temp_file = self.save_temp_image(qr_img, f"qr_{game_id}")
        
        # Position the QR code
        qr_x = center_x - self.qr_size / 2
        qr_y = center_y - self.qr_size / 2
        
        # Draw QR code
        c.drawImage(temp_file, qr_x, qr_y, width=self.qr_size, height=self.qr_size)
        
        # Add text above QR code
        text_above = f"Log your play of {game_name}"
        self.add_text_to_pdf(c, text_above, center_x, qr_y + self.qr_size + 15, font_size=9)
        
        # Add text below QR code
        text_below = "on the BG Stats app!"
        self.add_text_to_pdf(c, text_below, center_x, qr_y - 20, font_size=9)
        
        return temp_file


def read_csv_data(csv_file_path):
    """Read game data from CSV file."""
    games_data = []
    
    try:
        with open(csv_file_path, 'r', newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            
            # Check if required columns exist
            if 'gameId' not in reader.fieldnames or 'gameName' not in reader.fieldnames:
                raise ValueError("CSV file must contain 'gameId' and 'gameName' columns")
            
            for row in reader:
                game_id = row['gameId'].strip()
                game_name = row['gameName'].strip()
                
                if game_id and game_name:  # Skip empty rows
                    games_data.append((game_id, game_name))
        
        return games_data
    
    except FileNotFoundError:
        print(f"Error: CSV file '{csv_file_path}' not found.")
        sys.exit(1)
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(
        description='Generate printable PDF pages with QR codes for BG Stats app',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Example usage:
    python generate_qr_pdf.py games.csv output.pdf
    python generate_qr_pdf.py games.csv output.pdf --logo bgstats_logo.png

CSV file format:
    gameId,gameName
    12345,Settlers of Catan
    67890,Ticket to Ride
    ...
        """
    )
    
    parser.add_argument('csv_file', help='Input CSV file with gameId and gameName columns')
    parser.add_argument('output_pdf', help='Output PDF file path')
    parser.add_argument('--logo', help='Path to BG Stats logo image (optional)')
    
    args = parser.parse_args()
    
    # Validate input file
    if not os.path.exists(args.csv_file):
        print(f"Error: Input file '{args.csv_file}' does not exist.")
        sys.exit(1)
    
    # Read CSV data
    print(f"Reading games from {args.csv_file}...")
    games_data = read_csv_data(args.csv_file)
    
    if not games_data:
        print("No valid game data found in CSV file.")
        sys.exit(1)
    
    print(f"Found {len(games_data)} games")
    
    # Generate PDF
    generator = QRCodePDFGenerator(logo_path=args.logo)
    generator.generate_pdf(games_data, args.output_pdf)


if __name__ == "__main__":
    main()