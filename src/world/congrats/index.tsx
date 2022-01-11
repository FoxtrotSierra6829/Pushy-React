import { setCookie } from '../../config/constants';
import '../styles.css';

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'F11' && e.key !== 'F12') {
        e.preventDefault();
    }
    switch (e.key) {
        case 'Enter':
            gotomenu();
            break;
        case 'Escape':
            gotomenu();
            break;

        default:
            console.log(e.key + ' key pressed');
    }
};
const gotomenu = () => {
    setCookie('mode', 'menu', 365);
    window.location.reload();
};

const Congrats = () => {
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e);
    });
    return (<div></div>
    );
};

export default Congrats;
