import React from 'react'
import {Link} from 'react-router-dom'

function NavigationBar(props) {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    // Removed unused clickHandler

  return (
    <div className='flex w-full justify-around p-4 items-center'>
        
        <h1 className='text-2xl uppercase text-slate-200'>Shipment Delivery Application</h1>
        <ul className='flex flex-row w-[30%] justify-between items-center text-slate-200'>
            <li className='underline'>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/'>About us</Link>
            </li>
            <li>
                <Link to='/'>Contact us</Link>
            </li>
            
            <div className='w-[170px] flex justify-between relative'>

                {!isLoggedIn &&
                    <Link to='/login'>
                        <li className='p-2 w-[80px] bg-blue-400 text-sm text-center rounded-lg'>Login</li>
                    </Link>
                }
                { !isLoggedIn &&
                    <Link to='/register'>
                        <li className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Register</li>
                    </Link>
                    
                }
                { isLoggedIn &&
                    <Link to='/dashboard'>
                        <button className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Dashboard</button>
                    </Link>
                }
                { isLoggedIn &&
                    <Link to='/track'>
                        <button className='p-2 w-[80px] bg-blue-400 text-center text-sm rounded-lg'>Track</button>
                    </Link>
                }
            </div>
        </ul>
    </div>
  )
}

export default NavigationBar