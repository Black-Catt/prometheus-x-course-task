const Footer = () => {
  return (
    <footer data-testid="footer-component" className="footer">
      <div data-testid="footer-container" className="footer__container">
        <p data-testid="footer-copy" className="footer__copy">
          Made in{' '}
          <a
            data-testid="prometheus-link"
            target="_blank"
            rel="noreferrer"
            href="https://prometheus.org.ua/"
          >
            Prometheus
          </a>{' '}
          © 2022
        </p>
      </div>
    </footer>
  );
};
export default Footer;
