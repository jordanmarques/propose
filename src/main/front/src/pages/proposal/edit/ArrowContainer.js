import posed from 'react-pose'

const ArrowContainer = posed.div({
    closed: { rotate: 90},
    open: { rotate : -90}
});

export default ArrowContainer;
