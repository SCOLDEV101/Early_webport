import Nav from "./components"
import Projectslider from "./components"
import PortfolioDataList from "./components"
import ServicesDataList from "./components"
import MemberDataList from "./components"
import Enquiry from "./components"
import Footer from "./components"
import PortfolioData from 'data';
import ServicesData from 'data';
import MemberData from 'data';


export default function Home() {
  return (
    <>
      <Nav/>

{/* //////////////////////////////////////////////////////////////////////// */}

      <section id="Home">
        <p>รับถอนขน</p>
        <p>รับถอนขน</p>
      <Projectslider/>
      </section>

{/* //////////////////////////////////////////////////////////////////////// */}

       <section id="Portfolio">
          {PortfolioData.map((data,i) => (
            <PortfolioDataList data={data} />
          ))}
       </section>

{/* //////////////////////////////////////////////////////////////////////// */}


       <section id="About">
          
       </section>

{/* //////////////////////////////////////////////////////////////////////// */}


       <section id="services">
       {ServicesData.map((data,i) => (
            <ServicesDataList data={data} />
          ))}
       </section>

{/* //////////////////////////////////////////////////////////////////////// */}


       <section id="member">
       {MemberData.map((data,i) => (
            <MemberDataList data={data} />
          ))}
       </section>

{/* //////////////////////////////////////////////////////////////////////// */}

       <section id="Enquiry">
        <Enquiry/>
       </section>


{/* //////////////////////////////////////////////////////////////////////// */}


       <Footer/>

    </>
  );
}
