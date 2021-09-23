import React, { Component } from 'react';
import './index.css'

class Modal extends Component {
  render() {
    return <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-title">这是modal标题</div>
        <div className="modal-content">这是modal内容</div>
        <div className="modal-operator">
          <button className="modal-operator-close">取消</button>
          <button className="modal-operator-confirm">确认</button>
        </div>
      </div>
      <div className="mask"></div>
    </div>
  }
}
export default Modal;
