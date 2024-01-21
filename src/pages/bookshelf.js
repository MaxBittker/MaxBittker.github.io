import React from "react";

import "./example.less";
import shelf from "./bookshelf/shelf.jpg";
import connie from "./bookshelf/connie.jpeg";
import ttc from "./bookshelf/tao_te_ching.png"
import weaving from "./bookshelf/weaving.webp"

import "./bookshelf/bookshelf.css";

export default class Games extends React.Component {
  render() {
    return (
      <div className="shelf">
        <img src={shelf}></img>

      <br></br>
      <img className="book" src={ttc} alt="The Tao te Ching translation by Ursula K. Le Guin " title="The Tao te Ching translation by Ursula K. Le Guin "></img>
      <img className="book" src={weaving} alt="Anni Albers, on Weaving" title="Anni Albers, on Weaving"></img>
      <br></br>

        <img className="album" src={connie} alt="Connie Converse - How Sad, How Lovely" title="Connie Converse - How Sad, How Lovely"></img>
        <img className="album" src="https://upload.wikimedia.org/wikipedia/en/8/85/ItWasHotWeStayedInTheWaterCover.jpg" alt="The Microphones - It was Hot, we stayed in the water" title="The Microphones - It was Hot, we stayed in the water"></img>
        <img className="album" src="https://i.discogs.com/dWCXUaPJxNF-Elbfl7YUZzZiC402aiP4KQUBgM3HpVk/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1MTcy/NDYtMTIyNTUwNjk3/MC5qcGVn.jpeg" alt="Arthur Russel - Love is Overtaking Me" title="Arthur Russel - Love is Overtaking Me"></img>
        <img className="album" src="https://i.discogs.com/-TPDOxjQITpy0SkFxeCjHgsTWhUz8TKocSRyr8ICYqo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NjU4/MzUtMTY3NjY5NjI3/NC03OTc5LmpwZWc.jpeg" alt="Ramshackle Glory - Live the Dream" title="Ramshackle Glory - Live the Dream"></img>
        <img className="album" src="https://i.discogs.com/YhjoHEONf_RFb9EUcXjt3orGv1vBTlvhhKRK2Ltb4aI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNjE4/NzY2LTE1MDEwNTg0/ODgtNjM5Mi5qcGVn.jpeg" alt="Nana Grizol - Ursa Minor" title="Nana Grizol - Ursa Minor"></img>
        <img className="album" src="https://i.discogs.com/d_08H2Id3o-LqzLnQN72LcihGmeY6QKTTlBupa9HmBs/rs:fit/g:sm/q:90/h:600/w:591/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4OTM1/NC0xNjAzMDE3MTk3/LTk1MjEuanBlZw.jpeg" alt="Songs: Ohia - The Magnolia Electric Co." title="Songs: Ohia - The Magnolia Electric Co."></img>
<img className="album" src="https://i.discogs.com/FR9lCzrV0Eqs2V0oFMbICij-ZKSnF_eWZw9x6MkiJVY/rs:fit/g:sm/q:90/h:548/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzE4/NDY0LTE1NTAwOTE5/MzYtNDU0My5qcGVn.jpeg"  alt="Robyn - Honey" title="Robyn - Honey"></img>
<img className="album" src="https://i.discogs.com/Q-8eWi3F2f4JmB7fT8BsqLvwF3fiCX-OH0wJWh7tsCs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3Mjgw/ODgtMTM2NjkyMjA4/Ny0yNTAyLmpwZWc.jpeg"  alt="Bill Callahan - Sometimes I Wish We Were an Eagle" title="Bill Callahan - Sometimes I Wish We Were an Eagle"></img>
<img className="album" src="https://i.discogs.com/A2lx7X0oz1AQCceuSJlFzDmTWtAYf8S0GN-1-gDGvnk/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDI1/ODA2LTE1MTYxMTUx/NDMtNTU3Mi5qcGVn.jpeg"  alt="Laaraji - Vision Songs Vol. 1" title="Laaraji - Vision Songs Vol. 1"></img>
<img className="album" src="https://i.discogs.com/RuVS-efrxKKAvQXK98YdtyHc6EDfn7Eh3G2N11L8_2U/rs:fit/g:sm/q:90/h:600/w:586/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0MzA2/NS0xNjk5NjI4MzY3/LTcyMDguanBlZw.jpeg"  alt="Yo La Tengo - I can hear the heart beating as one" title="Yo La Tengo - I can hear the heart beating as one"></img>
<img className="album" src="https://i.discogs.com/-rz_gYvNwQ-Rw_jAbF9IwIiG0SSp6N3aEu5EOZo-AaM/rs:fit/g:sm/q:90/h:600/w:597/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODI1/MDYzLTE1ODIzMjIz/MjAtNzE2Ni5qcGVn.jpeg"  alt="Swamp Dogg - Sorry You Couldn't Make It" title="Swamp Dogg - Sorry You Couldn't Make It"></img>
<img className="album" src="https://i.discogs.com/58iCXHy_Lx31iEDm1xuSfmpBRjDVVmXj9CXoAfTTDs0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/NzIxLTE1Nzk4ODE0/MDItMTA2Ny5qcGVn.jpeg"  alt="Andy Shauf - The Neon Skyline" title="Andy Shauf - The Neon Skyline"></img>
<img className="album" src="https://i.discogs.com/BgfL5cm5mkVWFI3L1YFuy7QSgBpyrWEgiZ51Z96XYf4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODQ3/ODktMTI2NTc3MzI5/MC5qcGVn.jpeg"  alt="Lucinda Williams - Car Wheels on a Gravel Road" title="Lucinda Williams - Car Wheels on a Gravel Road"></img>
<img className="album" src="https://i.discogs.com/FptRWHXBR9mOYo0OTvy_D3uHy4ny0fBTt_Mn-qR53PI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNzI3/NDMzLTE1NTk4NTUx/NjUtODc2NC5qcGVn.jpeg"  alt="Katie Dey - Solipsisters" title="Katie Dey - Solipsisters"></img>
<img className="album" src="https://i.discogs.com/dGMgrschNI2ZMMp19Eg8ndGSRGy1-JBevujgLq5k1oY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MDUw/MDAtMTQ2ODM5NTY5/MC00MjQwLmpwZWc.jpeg"  alt="Daniel Johnston - 1990" title="Daniel Johnston - 1990"></img>
<img className="album" src="https://i.discogs.com/IBRO5X1WPDdFXflUG65VpdPzQJVzqUVFlsLoFkRV7vw/rs:fit/g:sm/q:90/h:348/w:386/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1MDIw/ODItMTIyNDQ2NjIw/Mi5qcGVn.jpeg"  alt="Chad VanGaalen - Soft Airplane" title="Chad VanGaalen - Soft Airplane"></img>
<img className="album" src="https://i.discogs.com/Vt0ngf1T_ZeDgVwtDk9ISD-ALFNcenFidkBiN0MRSUY/rs:fit/g:sm/q:90/h:600/w:592/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MjE2/MjQtMTI1MTA1ODc2/My5qcGVn.jpeg" alt="Tom T Hall - Greatest Hits" title="Tom T Hall - Greatest Hits"></img>
      </div>
    );
  }
}
