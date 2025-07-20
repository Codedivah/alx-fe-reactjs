function Footer() {
  return (
    <footer style={{ marginTop: '20px', padding: '10px', background: '#ddd', textAlign: 'center' }}>
      <p>&copy; {new Date().getFullYear()} My Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
