import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth, screenratio } from '../../config/constants'
import '../styles.css'


function Beancount(props) {
    return (
      <div className={'beancount-'+props.beancount}
          style={{
              width: scale*screenratio()+ 'vh',
              height: scale*screenratio()+ 'vh',
              top: scale*screenratio()*(worldheight-2)+scale*screenratio()+ 'vh',
              color: 'transparent',
              left: scale*screenratio()*((worldwidth-4)/2)+scale*screenratio()+'vh',
              }}
      
      > {'B'}
      </div>
  )
}


function mapStateToProps(state) {
    return {
        beancount: state.bean.count,
    }
}

export default connect(mapStateToProps)(Beancount)

