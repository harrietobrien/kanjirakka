import CSS from 'csstype';

const h1Styles: CSS.Properties = {
    // eslint-disable-next-line no-template-curly-in-string
    background: '${props => props.background || "transparent"}',
    position: 'absolute',
    border: '2px solid #000',
    borderEndEndRadius: '3px',
    display: 'inline-block',
    cursor: 'pointer',
    transition: '0.25s',
    right: 0,
    bottom: '2rem',
    padding: '0.25rem 0.75rem',
    fontFamily: 'sans-serif',
    fontSize: '1.5rem',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)'
};