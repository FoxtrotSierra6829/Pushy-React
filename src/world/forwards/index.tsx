import { maxlevel, scale, worldheight, worldwidth, screenratio, setCookie, getCookie } from '../../config/constants'
import '../styles.css'

const forwards = () => {
    let level = parseInt(getCookie('level'))+1
    let highscorelevel = parseInt(getCookie('highscorelevel'))
    if (level>=maxlevel) {
      level=maxlevel
  }
    else if (level>=highscorelevel+1) {
        level=highscorelevel+1
    }
    setCookie('level', level, 365)
    window.location.reload();
}


const Forwards = () => {
    return (
        <div className="forwards" onClick={() => forwards()}
            style={{
                width: scale*screenratio()*0.3+ 'vh',
                height: scale*screenratio()*0.3+ 'vh',
                top: scale*screenratio()*(worldheight-1)+scale*screenratio()*0.4+ 'vh',
                color: 'transparent',
                left: scale*screenratio()*(worldwidth-1)+scale*screenratio()*0.4+'vh',
                }}
        
        >
            {'F'}
        </div>
    )
}

export default Forwards