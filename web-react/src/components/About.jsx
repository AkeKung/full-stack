import React from 'react'
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div>
      <div className="container mt-3">
      <label className="label">Developer information</label>
        <div className="row">
        <div className="col">
          <div className="card">
            <img src={process.env.PUBLIC_URL+'/2shot2.jpg'} className='card-img-top' alt="..."  />
            <div className="card-body">
                        <h4 class="card-title">Manager</h4>
                        <p class="card-text">Weerachai Sarakun (610610614)</p>
              </div>
            </div>
          </div>
          <div className="col">
          <div className="card">
            <img src={process.env.PUBLIC_URL+'/88576.jpg'} className='card-img-top' alt="..." />
            <div className="card-body">
                        <h4 class="card-title">Manager</h4>
                        <p class="card-text">Inthanin Panching (610610626)</p>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
