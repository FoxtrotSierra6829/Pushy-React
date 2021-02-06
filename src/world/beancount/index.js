import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'


function Beancount(props) {
    return (
      <div className={'beancount-'+props.beancount}
          style={{
              width: scale+ 'vh',
              height: scale+ 'vh',
              top: scale*(worldheight-2)+scale+ 'vh',
              color: 'transparent',
              left: scale*((worldwidth-4)/2)+scale+'vh',
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

