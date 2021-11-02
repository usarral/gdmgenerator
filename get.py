from dotenv import load_dotenv

load_dotenv()

console.log(os.environ.get("IMAP_PORT"))