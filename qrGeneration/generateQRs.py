import psycopg2 # pip install psycopg2-binary
import qrcode # pip install qrcode[pil] 
import os 
import dotenv # pip install python-dotenv


# Load environment variables from .env file
dotenv.load_dotenv()

host = os.getenv("PGHOST")
port = os.getenv("PGPORT")
dbname = os.getenv("PGDATABASE")
user = os.getenv("PGUSER")
password = os.getenv("PGPASSWORD")

# Database connection details
db_host = host
db_port = port # Default port for PostgreSQL
db_name = dbname
db_user = user
db_password = password

# Path to save the QR codes
output_dir = 'qrs/'

# Create directory if it doesn't exist
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Connect to the database
try:
    conn = psycopg2.connect(
        host=db_host,
        port=db_port,
        dbname=db_name,
        user=db_user,
        password=db_password
    )
    cursor = conn.cursor()
    print("Database connection successful.")
    
    # Query to fetch all uuids from the qr table
    cursor.execute("SELECT id, uuid FROM qr")
    
    # Fetch all the results
    rows = cursor.fetchall()
    
    for row in rows:
        # Extract the ID and UUID
        record_id, uuid = row
        
        # Generate QR code
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(uuid)
        qr.make(fit=True)
        
        # Create an image for the QR code
        img = qr.make_image(fill='black', back_color='white')
        
        # Save the image with the ID as the filename
        img.save(f"{output_dir}{record_id}.png")
        print(f"QR for ID {record_id} saved.")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    cursor.close()
    conn.close()
    print("Database connection closed.")
