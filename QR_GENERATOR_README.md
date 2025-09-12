# QR Code PDF Generator for BG Stats App

This Python script generates printable PDF pages containing 3x3 grids of QR codes for the BG Stats app. Each QR code encodes a URL for logging game plays at a specific location, with the center cell displaying the BG Stats logo.

## Features

- **3x3 Grid Layout**: Each page contains a 3x3 grid with 8 QR codes and 1 center logo
- **Multiple Pages**: Automatically creates additional pages for more than 8 games
- **Custom Text**: Displays game-specific text above and below each QR code
- **Logo Support**: Center cell displays BG Stats logo (custom or placeholder)
- **URL Encoding**: Generates proper URLs for the BG Stats app with location parameter

## Installation

1. Install Python 3.6 or later
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

### Dependencies

- `qrcode[pil]==7.4.2` - QR code generation
- `reportlab==4.0.7` - PDF generation
- `Pillow==10.1.0` - Image processing

## Usage

### Basic Usage

```bash
python generate_qr_pdf.py input.csv output.pdf
```

### With Custom Logo

```bash
python generate_qr_pdf.py input.csv output.pdf --logo bgstats_logo.png
```

### Command Line Arguments

- `csv_file` (required): Input CSV file with gameId and gameName columns
- `output_pdf` (required): Output PDF file path
- `--logo` (optional): Path to BG Stats logo image

## CSV File Format

The input CSV file must contain the following columns:

- `gameId`: Unique identifier for the game (used in the BG Stats URL)
- `gameName`: Display name of the game (used in the text labels)

### Example CSV

```csv
gameId,gameName
12345,Settlers of Catan
67890,Ticket to Ride
11111,Splendor
22222,Azul
33333,Wingspan
```

## Output Format

Each page contains:

- **3x3 grid** with 9 cells total
- **8 QR codes** (all cells except center)
- **1 logo** in the center cell
- **Text labels** for each QR code:
  - Above: "Log your play of {gameName}"
  - Below: "on the BG Stats app!"

### QR Code URLs

Each QR code encodes a URL in the format:
```
https://app.bgstatsapp.com/addPlay.html?gameId={gameId}&location=Valhalla%20Board%20Game%20Cafe
```

## Examples

### Generate PDF with sample data
```bash
python generate_qr_pdf.py sample_games.csv my_games.pdf
```

### Generate PDF with custom logo
```bash
python generate_qr_pdf.py sample_games.csv my_games.pdf --logo my_logo.png
```

## Sample Files

- `sample_games.csv`: Example CSV file with 11 games
- `bgstats_logo.png`: Sample BG Stats logo placeholder

## Technical Details

- **Page Size**: US Letter (8.5" x 11")
- **QR Code Size**: 120x120 pixels
- **Grid Layout**: 3x3 with equal cell spacing
- **Margins**: 0.5 inch on all sides
- **Font**: Helvetica, 9pt for labels
- **Multiple Pages**: Automatically created for >8 games per page

## Error Handling

The script includes error handling for:
- Missing CSV files
- Invalid CSV format (missing required columns)
- Image loading failures (falls back to placeholder logo)
- Empty game data

## Limitations

- Maximum recommended games per run: ~1000 (due to temporary file handling)
- Logo image formats: PNG, JPEG, GIF (converted to PNG for PDF)
- QR code capacity: Supports URLs up to ~200 characters

## License

This script is part of the Board Game Probabilities project. See the main project LICENSE file for details.