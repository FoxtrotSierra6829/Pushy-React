import { connect } from 'react-redux'
import { scale, worldHeight, worldWidth, screenRatio } from '../../config/constants'
import '../styles.css'


const Beancount = (props: any) => {
    return (
      <div className={'beancount-'+props.beancount}
          style={{
              width: scale*screenRatio()+ 'vh',
              height: scale*screenRatio()+ 'vh',
              top: scale*screenRatio()*(worldHeight-2)+scale*screenRatio()+ 'vh',
              color: 'transparent',
              left: scale*screenRatio()*((worldWidth-4)/2)+scale*screenRatio()+'vh',
              }}
      
      > {'B'}
      </div>
  )
}


const mapStateToProps = (state: any) => {
    return {
        beancount: state.bean.count,
    }
}

export default connect(mapStateToProps)(Beancount)

