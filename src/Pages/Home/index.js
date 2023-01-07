import './Home-Style.css'

import { Link } from 'react-router-dom';

import Save from '../../images/save.png';
import Bitcoin from '../../images/bitcoin.jpg';
import Parque from '../../images/parque.jpg';
import Fundos from '../../images/fundos.webp';

import PreLogin from '../PreLogin';
import Register from '../Register';
import About from '../About';

export default () => {
    return(
        <div className="home">
            <header>
                <div className="logo">
                    <img src={Save} alt="logo" />
                    <h2>Money Manager</h2>
                </div>

                <Link className='link' to="/about" element={<About />} >About</Link>

                <div>
                    <Link className='link' to="/prelogin" element={<PreLogin />} >signIn</Link>
                    <Link className='link' to="/register" element={<Register />} >signUp</Link>
                </div>
                    
            </header>

            <main>
                <div className='why'>
                    <div> 
                        <h1>Why this site ? </h1>
                        <p>This site has the purpose of helping you to save and control your expenses.</p>
                        <p>Here you can save, manage and view your money dynamically. You can also add cash inflows and outflows.</p>
                    </div>
                    
                </div>
                

                <div className='up'>
                    <h2>Why to save money ?</h2>
                    <p>For many people, money can be a villain, but it is fundamental for everyone. Controlling your expenses is essential to have a good quality of life.</p>
                    <p>Moreover , money can help you achieve your goals . Successful people are those who manage to have a cash flow greater than their debts.</p>
                </div>
                

                <div className='tips'>
                    <h2>Tips:</h2>
                    <div>
                        <p>Try to save some money every week , even a little .</p>
                        <img src={Bitcoin} alt="" />
                    </div>
                    <div>
                        <p>Try investing in assets such as cryptocurrencies, stocks and real estate funds.</p>
                        <img src={Fundos} alt="" />
                    </div>
                    <div>
                        <p>Remember that life should be enjoyed, reserve some of your money for fun. buy yourself anything you want.</p>
                        <img src={Parque} alt="" />
                    </div>
                </div>

                
                
                
                




            </main>
        </div>
    )
}