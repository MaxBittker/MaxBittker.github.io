import React from "react";

import "./example.less";
import shelf from "./bookshelf/shelf_small.webp";
import connie from "./bookshelf/connie.jpeg";
import ttc from "./bookshelf/tao_te_ching.png";
import weaving from "./bookshelf/weaving.webp";
import water from "./bookshelf/water.jpg";
import mindstorms from "./bookshelf/mindstorms.jpg";
import "./bookshelf/bookshelf.css";

import c1 from "./bookshelf/covers/1.png";
import c2 from "./bookshelf/covers/2.png";
import c3 from "./bookshelf/covers/3.png";
import c4 from "./bookshelf/covers/4.png";
import c5 from "./bookshelf/covers/5.png";
import c6 from "./bookshelf/covers/6.png";
import c7 from "./bookshelf/covers/7.png";
import c8 from "./bookshelf/covers/8.png";
import c9 from "./bookshelf/covers/9.png";
import c10 from "./bookshelf/covers/10.png";
import c11 from "./bookshelf/covers/11.png";
import c12 from "./bookshelf/covers/12.png";
import c13 from "./bookshelf/covers/13.png";
import c14 from "./bookshelf/covers/14.png";
import c15 from "./bookshelf/covers/15.png";
import c16 from "./bookshelf/covers/16.png";
import c17 from "./bookshelf/covers/17.png";
import c18 from "./bookshelf/covers/18.png";
import c19 from "./bookshelf/covers/19.png";
import c20 from "./bookshelf/covers/20.png";
import c21 from "./bookshelf/covers/21.png";
import c22 from "./bookshelf/covers/22.png";
import c23 from "./bookshelf/covers/23.png";
import c24 from "./bookshelf/covers/24.png";
import c25 from "./bookshelf/covers/25.png";
import c26 from "./bookshelf/covers/26.png";
import c27 from "./bookshelf/covers/27.png";
import c28 from "./bookshelf/covers/28.png";
import c29 from "./bookshelf/covers/29.png";
import c30 from "./bookshelf/covers/30.png";
import c31 from "./bookshelf/covers/31.png";
import c32 from "./bookshelf/covers/32.png";
import c33 from "./bookshelf/covers/33.png";
import c34 from "./bookshelf/covers/34.png";
import c35 from "./bookshelf/covers/35.png";
import c36 from "./bookshelf/covers/36.png";
import c37 from "./bookshelf/covers/37.png";
import c38 from "./bookshelf/covers/38.png";
import c39 from "./bookshelf/covers/39.png";
import c40 from "./bookshelf/covers/40.png";
import c41 from "./bookshelf/covers/41.png";
import c42 from "./bookshelf/covers/42.png";
import c43 from "./bookshelf/covers/43.png";
import c44 from "./bookshelf/covers/44.png";
import c45 from "./bookshelf/covers/45.png";
import c46 from "./bookshelf/covers/46.png";
import c47 from "./bookshelf/covers/47.png";
import c48 from "./bookshelf/covers/48.png";
import c49 from "./bookshelf/covers/49.png";
import c50 from "./bookshelf/covers/50.png";
import c51 from "./bookshelf/covers/51.png";
import c52 from "./bookshelf/covers/52.png";
import c53 from "./bookshelf/covers/53.png";
import c54 from "./bookshelf/covers/54.png";
import c55 from "./bookshelf/covers/55.png";
import c56 from "./bookshelf/covers/56.png";

let titles = {
  [c1]: "The Cold Start Problem, Andrew Chen",
  [c2]: "How to Do Nothing, Jenny Odell",
  [c3]: "A Year with Swollen Appendices, Brian Eno",
  [c4]: "The Empathy Diaries, Sherry Turkle",
  [c5]: "Maus, Art Spiegelman",
  [c6]: "Pilgrim at Tinker Creek, Annie Dillard",
  [c7]: "Notes on the Synthesis of Form, Christopher Alexander",
  [c8]: "A Pattern Language, Christopher Alexander",
  [c9]: "Prisoners' Inventions, Angelo",
  [c10]: "The New Games Book, Andrew Fluegelman",
  [c11]: "A *New* Program for Graphic Design, David Reinfurt",
  [c12]: "Impro, Keith Johnstone",
  [c13]: "Turtles, Termites, and Traffic Jams, Mitchel Resnick",
  [c14]: "Lifelong Kindergarten, Mitchel Resnick",
  [c15]: "Vehicles, Valentino Braitenberg",
  [c16]: "Notes on my Dunce Cap, Jesse Ball",
  [c17]: "Pedagogy of the Oppressed, Paulo Freire",
  [c18]: "Conflict is Not Abuse, Sarah Schulman",
  [c19]: "After Accountablity, Pinko Collective",
  [c20]: "The Case for Black Reparations, Boris Bittker",
  [c21]: "How Buildings Learn, Stewart Brand",
  [c22]: "Landscape and Desire, John Bell",
  [c23]:
    "68 Ways to make Really Big Puppets, Sara Peattie and the Puppeteers Collective",
  [c24]: "Making Comics, Lynda Barry",
  [c25]: "Children's Experiences in Art, Pearl Greenberg",
  [c26]: "Taking a Line for a Walk Assignments in Design Education, Nina Paim",
  [c27]: "Understanding Comics, Scott McCloud",
  [c28]: "The Phenomenon of Life, Christopher Alexander",
  [c29]: "Ecology of The Planted Aquarium, Diana Walstad",
  [c30]: "The Soul of a New Machine, Tracy Kidder",

  [c31]: "Gödel, Escher, Bach, Douglas Hofstadter",
  [c32]: "Invisible Cities, Italo Calvino",
  [c33]: "Chelsea Girls, Eileen Myles",
  [c34]: "Paul Takes The Form of a Mortal Girl, Andrea Lawlor",
  [c35]: "Darryl, Jackie Ess",
  [c36]: "Fantasian, Larissa Pham",
  [c37]: "The Dispossessed, Ursula K. Le Guin",
  [c38]: "Idoru, William Gibson",
  [c39]: "The Overstory, Richard Powers",

  [c40]: "The Living, Annie Dillard",
  [c41]: "Wolf in White Van, John Darnielle",
  [c42]:
    "Seeing is forgetting the name of the thing one sees, Lawrence Weschler",
  [c43]: "Underground, Haruki Murakami",
  [c44]: "Lonely Hearts Killer, Tomoyuki Hoshino",
  [c45]: "There is no antimimetics Division, qntm",
  [c46]: "The Plauge, Albert Camus",
  [c47]: "The Castle, Franz Kafka",

  [c48]: "Soft Corruptor, Everest Pipkin",
  [c49]: "Ficciones, Jorge Luis Borges",
  [c50]: "Feeling Great About My Butt, Kawandeep Virdee",
  [c51]: "Waiting for Godot, Samuel Beckett",
  [c52]: "Parable of the Sower, Octavia Butler",
  [c53]: "Well Played Game, Bernard De Koven",
  [c54]: "The Earthsea Trilogy, Ursula K. Le Guin",
  [c55]: "Moby Dick, Herman Melville",
  [c56]: "Dream Work, Mary Oliver",
};

// width={4033}
// height={3025}
const MapSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 4033 3025"
    {...props}
  >
    <path
      d="M3083.34 194.976C3084 193.273 3086.41 193.273 3087.07 194.976L3095.59 216.961C3095.88 217.693 3096.56 218.192 3097.35 218.235L3120.89 219.546C3122.71 219.647 3123.46 221.939 3122.04 223.093L3103.77 237.99C3103.16 238.486 3102.89 239.293 3103.1 240.052L3109.12 262.847C3109.59 264.612 3107.64 266.029 3106.11 265.039L3086.29 252.261C3085.63 251.836 3084.78 251.836 3084.12 252.261L3064.31 265.039C3062.77 266.029 3060.82 264.612 3061.29 262.847L3067.32 240.052C3067.52 239.293 3067.26 238.486 3066.65 237.99L3048.37 223.093C3046.96 221.939 3047.7 219.647 3049.53 219.546L3073.07 218.235C3073.85 218.192 3074.54 217.693 3074.82 216.961L3083.34 194.976Z"
      fill="#E7CC86"
    />
    <path
      d="M523.377 1625.75C524.037 1624.05 526.446 1624.05 527.106 1625.75L535.627 1647.73C535.911 1648.47 536.597 1648.96 537.381 1649.01L560.923 1650.32C562.747 1650.42 563.491 1652.71 562.076 1653.87L543.8 1668.76C543.191 1669.26 542.929 1670.07 543.13 1670.82L549.159 1693.62C549.626 1695.38 547.676 1696.8 546.141 1695.81L526.325 1683.03C525.666 1682.61 524.818 1682.61 524.158 1683.03L504.342 1695.81C502.807 1696.8 500.857 1695.38 501.324 1693.62L507.353 1670.82C507.554 1670.07 507.292 1669.26 506.683 1668.76L488.408 1653.87C486.992 1652.71 487.737 1650.42 489.56 1650.32L513.102 1649.01C513.886 1648.96 514.572 1648.47 514.856 1647.73L523.377 1625.75Z"
      fill="#E7CC86"
    />
    <path
      d="M776.612 1673.01C777.272 1671.31 779.681 1671.31 780.341 1673.01L788.862 1695C789.146 1695.73 789.832 1696.23 790.616 1696.27L814.158 1697.58C815.982 1697.68 816.726 1699.97 815.311 1701.13L797.035 1716.03C796.426 1716.52 796.164 1717.33 796.365 1718.09L802.394 1740.88C802.861 1742.65 800.911 1744.06 799.376 1743.07L779.56 1730.3C778.9 1729.87 778.053 1729.87 777.393 1730.3L757.577 1743.07C756.042 1744.06 754.092 1742.65 754.559 1740.88L760.588 1718.09C760.789 1717.33 760.527 1716.52 759.918 1716.03L741.642 1701.13C740.227 1699.97 740.971 1697.68 742.795 1697.58L766.337 1696.27C767.121 1696.23 767.807 1695.73 768.091 1695L776.612 1673.01Z"
      fill="#E7CC86"
    />
    <path
      d="M901.077 1715.95C901.737 1714.24 904.147 1714.24 904.807 1715.95L913.328 1737.93C913.611 1738.66 914.297 1739.16 915.081 1739.21L938.623 1740.52C940.447 1740.62 941.192 1742.91 939.776 1744.06L921.5 1758.96C920.891 1759.46 920.629 1760.26 920.83 1761.02L926.859 1783.82C927.326 1785.58 925.377 1787 923.842 1786.01L904.026 1773.23C903.366 1772.81 902.518 1772.81 901.858 1773.23L882.042 1786.01C880.507 1787 878.558 1785.58 879.025 1783.82L885.054 1761.02C885.254 1760.26 884.992 1759.46 884.384 1758.96L866.108 1744.06C864.692 1742.91 865.437 1740.62 867.26 1740.52L890.803 1739.21C891.587 1739.16 892.272 1738.66 892.556 1737.93L901.077 1715.95Z"
      fill="#E7CC86"
    />
    <path
      d="M1569.35 1539.88C1570.01 1538.18 1572.42 1538.18 1573.08 1539.88L1581.6 1561.86C1581.88 1562.6 1582.57 1563.09 1583.35 1563.14L1606.89 1564.45C1608.72 1564.55 1609.46 1566.84 1608.04 1567.99L1589.77 1582.89C1589.16 1583.39 1588.9 1584.19 1589.1 1584.95L1595.13 1607.75C1595.6 1609.51 1593.65 1610.93 1592.11 1609.94L1572.29 1597.16C1571.63 1596.74 1570.79 1596.74 1570.13 1597.16L1550.31 1609.94C1548.78 1610.93 1546.83 1609.51 1547.29 1607.75L1553.32 1584.95C1553.52 1584.19 1553.26 1583.39 1552.65 1582.89L1534.38 1567.99C1532.96 1566.84 1533.71 1564.55 1535.53 1564.45L1559.07 1563.14C1559.86 1563.09 1560.54 1562.6 1560.83 1561.86L1569.35 1539.88Z"
      fill="#E7CC86"
    />
    <path
      d="M1666.16 1564C1666.82 1562.3 1669.23 1562.3 1669.89 1564L1678.41 1585.99C1678.69 1586.72 1679.38 1587.22 1680.16 1587.26L1703.7 1588.57C1705.53 1588.67 1706.27 1590.97 1704.86 1592.12L1686.58 1607.02C1685.97 1607.51 1685.71 1608.32 1685.91 1609.08L1691.94 1631.87C1692.41 1633.64 1690.46 1635.06 1688.92 1634.07L1669.11 1621.29C1668.45 1620.86 1667.6 1620.86 1666.94 1621.29L1647.12 1634.07C1645.59 1635.06 1643.64 1633.64 1644.11 1631.87L1650.13 1609.08C1650.34 1608.32 1650.07 1607.51 1649.47 1607.02L1631.19 1592.12C1629.77 1590.97 1630.52 1588.67 1632.34 1588.57L1655.88 1587.26C1656.67 1587.22 1657.35 1586.72 1657.64 1585.99L1666.16 1564Z"
      fill="#E7CC86"
    />
    <path
      d="M2050.89 1810.46C2051.55 1808.76 2053.96 1808.76 2054.62 1810.46L2063.14 1832.45C2063.42 1833.18 2064.11 1833.68 2064.89 1833.72L2088.43 1835.03C2090.26 1835.13 2091 1837.42 2089.59 1838.58L2071.31 1853.48C2070.7 1853.97 2070.44 1854.78 2070.64 1855.54L2076.67 1878.33C2077.14 1880.1 2075.19 1881.51 2073.65 1880.53L2053.84 1867.75C2053.18 1867.32 2052.33 1867.32 2051.67 1867.75L2031.85 1880.53C2030.32 1881.51 2028.37 1880.1 2028.84 1878.33L2034.86 1855.54C2035.07 1854.78 2034.8 1853.97 2034.19 1853.48L2015.92 1838.58C2014.5 1837.42 2015.25 1835.13 2017.07 1835.03L2040.61 1833.72C2041.4 1833.68 2042.08 1833.18 2042.37 1832.45L2050.89 1810.46Z"
      fill="#E7CC86"
    />
    <path
      d="M3610.05 2063.92C3610.71 2062.21 3613.12 2062.21 3613.78 2063.92L3622.31 2085.9C3622.59 2086.63 3623.27 2087.13 3624.06 2087.18L3647.6 2088.49C3649.42 2088.59 3650.17 2090.88 3648.75 2092.03L3630.48 2106.93C3629.87 2107.43 3629.61 2108.23 3629.81 2108.99L3635.84 2131.79C3636.3 2133.55 3634.35 2134.97 3632.82 2133.98L3613 2121.2C3612.34 2120.78 3611.5 2120.78 3610.84 2121.2L3591.02 2133.98C3589.48 2134.97 3587.54 2133.55 3588 2131.79L3594.03 2108.99C3594.23 2108.23 3593.97 2107.43 3593.36 2106.93L3575.09 2092.03C3573.67 2090.88 3574.41 2088.59 3576.24 2088.49L3599.78 2087.18C3600.56 2087.13 3601.25 2086.63 3601.53 2085.9L3610.05 2063.92Z"
      fill="#E7CC86"
    />
    <path
      d="M789.077 23.2356C789.737 21.5326 792.147 21.5326 792.807 23.2356L801.328 45.2206C801.612 45.9528 802.297 46.4511 803.081 46.4948L826.624 47.8049C828.447 47.9063 829.192 50.198 827.776 51.352L809.5 66.2496C808.892 66.7457 808.63 67.5521 808.83 68.3112L814.859 91.1059C815.326 92.8716 813.377 94.2879 811.842 93.2981L792.026 80.5203C791.366 80.0948 790.518 80.0948 789.858 80.5203L770.042 93.2981C768.507 94.2879 766.558 92.8716 767.025 91.1059L773.054 68.3112C773.255 67.5521 772.993 66.7457 772.384 66.2496L754.108 51.352C752.692 50.198 753.437 47.9063 755.261 47.8049L778.803 46.4948C779.587 46.4511 780.273 45.9528 780.556 45.2206L789.077 23.2356Z"
      fill="#E7CC86"
    />
    <path
      d="M579.054 47.1138C579.714 45.4108 582.123 45.4108 582.783 47.1138L591.304 69.0988C591.588 69.8309 592.274 70.3293 593.058 70.3729L616.6 71.683C618.423 71.7845 619.168 74.0762 617.752 75.2302L599.477 90.1277C598.868 90.6239 598.606 91.4302 598.807 92.1893L604.836 114.984C605.303 116.75 603.353 118.166 601.818 117.176L582.002 104.398C581.342 103.973 580.494 103.973 579.835 104.398L560.019 117.176C558.484 118.166 556.534 116.75 557.001 114.984L563.03 92.1893C563.231 91.4302 562.969 90.6239 562.36 90.1277L544.084 75.2302C542.669 74.0762 543.413 71.7845 545.237 71.683L568.779 70.3729C569.563 70.3293 570.249 69.8309 570.533 69.0988L579.054 47.1138Z"
      fill="#E7CC86"
    />

    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={75.6635}
      y={19.7271}
      width={413.627}
      height={1342.38}
      id={c54}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={530.634}
      y={141.33}
      width={134.249}
      height={1219.05}
      transform="rotate(1.5808 530.634 141.33)"
      id={c52}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={86.3391}
      y={1604.35}
      width={164.893}
      height={1328.09}
      transform="rotate(-0.0767265 86.3391 1604.35)"
      id={c1}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={255.336}
      y={1693.06}
      width={144.224}
      height={1250.73}
      transform="rotate(-0.0767265 255.336 1693.06)"
      id={c2}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={406.807}
      y={1710.67}
      width={235.217}
      height={1233.44}
      transform="rotate(-0.0767265 406.807 1710.67)"
      id={c3}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={655.67}
      y={1632.37}
      width={61.1048}
      height={1300.07}
      transform="rotate(-0.0767265 655.67 1632.37)"
      id={c4}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={729.694}
      y={1756.2}
      width={95.9747}
      height={1186.96}
      transform="rotate(-0.0767265 729.694 1756.2)"
      id={c5}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={862.009}
      y={1794}
      width={77.9461}
      height={1149.79}
      transform="rotate(-0.0767265 862.009 1794)"
      id={c6}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={956.46}
      y={1773.91}
      width={73.3656}
      height={1172.85}
      transform="rotate(-0.0767265 956.46 1773.91)"
      id={c7}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1050.74}
      y={1787.9}
      width={258.598}
      height={1159.01}
      transform="rotate(-0.0767265 1050.74 1787.9)"
      id={c8}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1340.44}
      y={1723.05}
      width={63.4846}
      height={1223.92}
      transform="rotate(-0.0767265 1340.44 1723.05)"
      id={c9}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1423.06}
      y={1624.83}
      width={90.4812}
      height={1335.43}
      transform="rotate(-0.0767265 1423.06 1624.83)"
      id={c53}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1528.64}
      y={1647.99}
      width={68.2081}
      height={1312.36}
      transform="rotate(-0.0767265 1528.64 1647.99)"
      id={c10}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1616.15}
      y={1660.44}
      width={90.4812}
      height={1300.07}
      transform="rotate(-0.0767265 1616.15 1660.44)"
      id={c11}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1722.61}
      y={1767.56}
      width={68.4639}
      height={1209.68}
      transform="rotate(-0.0767265 1722.61 1767.56)"
      id={c12}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1805.65}
      y={1665.96}
      width={63.7495}
      height={1294.13}
      transform="rotate(-0.0767265 1805.65 1665.96)"
      id={c13}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1870.16}
      y={1797.16}
      width={69.9976}
      height={1163.41}
      transform="rotate(-0.0767265 1870.16 1797.16)"
      id={c14}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1949.98}
      y={1807.73}
      width={56.2628}
      height={1176.99}
      transform="rotate(-0.0767265 1949.98 1807.73)"
      id={c15}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2018.29}
      y={1907.02}
      width={42.6417}
      height={1095.31}
      transform="rotate(-0.0767265 2018.29 1907.02)"
      id={c16}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2130.97}
      y={1659.71}
      width={56.2199}
      height={1342.03}
      transform="rotate(2.31762 2130.97 1659.71)"
      id={c17}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2208.53}
      y={1660.68}
      width={104.525}
      height={1330.8}
      transform="rotate(2.79298 2208.53 1660.68)"
      id={c18}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1.84644}
      y={2.1489}
      width={84.9253}
      height={1195.85}
      transform="matrix(0.997018 0.0771752 -0.0737988 0.997273 2329.77 1794.89)"
      id={c19}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1.8715}
      y={2.12711}
      width={76.0053}
      height={1256.88}
      transform="matrix(0.997854 0.0654834 -0.0621042 0.99807 2402.43 1734.66)"
      id={c20}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={90.6364}
      height={1520.3}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3934.63 2808.78)"
      id={c29}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.97288}
      y={2.03343}
      width={100.587}
      height={1494.47}
      transform="matrix(0.0134197 0.99991 -0.999859 0.0168053 3934.83 2694.16)"
      id={c28}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.98683}
      y={2.0198}
      width={74.7629}
      height={1437.78}
      transform="matrix(0.00653403 0.999979 -0.999951 0.00991996 3870.51 2591.09)"
      id={c27}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.98624}
      y={2.02038}
      width={114.211}
      height={1398.44}
      transform="matrix(0.00682641 0.999977 -0.999948 0.0102123 3838.89 2463.9)"
      id={c26}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={86.7926}
      height={1435.08}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3885.59 2338.5)"
      id={c25}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={79.1448}
      height={1324.79}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3780 2243.63)"
      id={c24}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={79.0247}
      height={1148.17}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3610.39 2106)"
      id={c21}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={20.5087}
      height={1439.4}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3902.05 2214.51)"
      id={c23}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={-1.95948}
      y={2.04634}
      width={20.5087}
      height={1425.22}
      transform="matrix(0.0199857 0.9998 -0.999727 0.0233709 3889.87 2185.73)"
      id={c22}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={702.571}
      y={137.516}
      width={171.19}
      height={1219.05}
      transform="rotate(1.5808 702.571 137.516)"
      id={c30}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={911.434}
      y={14.9485}
      width={149.734}
      height={1329.76}
      transform="rotate(1.5808 911.434 14.9485)"
      id={c31}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1065.17}
      y={204.38}
      width={66.6203}
      height={1159.3}
      id={c32}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1144.43}
      y={204.38}
      width={93.55}
      height={1159.3}
      id={c33}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1250.63}
      y={204.38}
      width={88.4842}
      height={1159.3}
      id={c34}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1365.47}
      y={141.275}
      width={74.3873}
      height={1220.83}
      id={c35}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1466.22}
      y={359.438}
      width={74.3873}
      height={1004.24}
      id={c36}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1566.96}
      y={412.421}
      width={122.224}
      height={951.256}
      id={c37}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1715.55}
      y={63.3594}
      width={122.224}
      height={1296.5}
      id={c38}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={1841.77}
      y={204.38}
      width={172.52}
      height={1159.3}
      id={c39}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2021.95}
      y={226.196}
      width={131.614}
      height={1137.48}
      id={c40}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2161.22}
      y={160.747}
      width={131.614}
      height={1187.64}
      id={c55}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2319.2}
      y={176.035}
      width={86.8138}
      height={1187.64}
      id={c41}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2421.08}
      y={87.2721}
      width={73.9155}
      height={1268.23}
      transform="rotate(1 2421.08 87.2721)"
      id={c42}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={3200.78}
      y={97.2472}
      width={69.3272}
      height={697.799}
      transform="rotate(87.5004 3200.78 97.2472)"
      id={c48}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2508.26}
      y={204.414}
      width={101.229}
      height={1157.64}
      transform="rotate(1 2508.26 204.414)"
      id={c43}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2610.65}
      y={224.626}
      width={87.9525}
      height={1148.33}
      id={c44}
      transform="rotate(1 2610.65 224.626)"
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2702.59}
      y={361.366}
      width={87.9525}
      height={1009.74}
      transform="rotate(1 2702.59 361.366)"
      id={c45}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2794.53}
      y={345.983}
      width={94.2227}
      height={1025.41}
      transform="rotate(1 2794.53 345.983)"
      id={c46}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={2913.09}
      y={208.828}
      width={127.167}
      height={1152.83}
      transform="rotate(1 2913.09 208.828)"
      id={c47}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={3061.19}
      y={211.117}
      width={57.3448}
      height={1163.45}
      transform="rotate(1 3061.19 211.117)"
      id={c49}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={3130.36}
      y={219.173}
      width={64.9578}
      height={1149.48}
      transform="rotate(1 3130.36 219.173)"
      id={c51}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={3196.37}
      y={170.454}
      width={34.8338}
      height={1197.5}
      transform="rotate(1 3196.37 170.454)"
      id={c56}
    />
    <rect
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      x={3235.23}
      y={49.8379}
      width={71.2036}
      height={1318.77}
      id={c50}
    />
  </svg>
);

// let options =
const Games = (props) => {
  return (
    <div className="shelf">
      <Shelf />
      <div className="rest">
        <img
          className="book"
          src={ttc}
          alt="The Tao te Ching translation by Ursula K. Le Guin "
          title="The Tao te Ching translation by Ursula K. Le Guin "
        ></img>
        <img
          className="book"
          src={weaving}
          alt="Anni Albers, on Weaving"
          title="Anni Albers, on Weaving"
        ></img>
        <img
          className="book"
          src={mindstorms}
          alt="Seymour Papert, Mindstorms"
          title="Seymour Papert, Mindstorms"
        ></img>
        <img
          className="book"
          src={c1}
          alt={titles[c1]}
          title={titles[c1]}
        ></img>
        <img
          className="book"
          src={c2}
          alt={titles[c2]}
          title={titles[c2]}
        ></img>
        <img
          className="book"
          src={c3}
          alt={titles[c3]}
          title={titles[c3]}
        ></img>
        <img
          className="book"
          src={c4}
          alt={titles[c4]}
          title={titles[c4]}
        ></img>
        <img
          className="book"
          src={c5}
          alt={titles[c5]}
          title={titles[c5]}
        ></img>
        <img
          className="book"
          src={c6}
          alt={titles[c6]}
          title={titles[c6]}
        ></img>
        <img
          className="book"
          src={c7}
          alt={titles[c7]}
          title={titles[c7]}
        ></img>
        <img
          className="book"
          src={c8}
          alt={titles[c8]}
          title={titles[c8]}
        ></img>
        <img
          className="book"
          src={c9}
          alt={titles[c9]}
          title={titles[c9]}
        ></img>
        <img
          className="book"
          src={c10}
          alt={titles[c10]}
          title={titles[c10]}
        ></img>
        <img
          className="book"
          src={c11}
          alt={titles[c11]}
          title={titles[c11]}
        ></img>
        <img
          className="book"
          src={c12}
          alt={titles[c12]}
          title={titles[c12]}
        ></img>
        <img
          className="book"
          src={c13}
          alt={titles[c13]}
          title={titles[c13]}
        ></img>
        <img
          className="book"
          src={c14}
          alt={titles[c14]}
          title={titles[c14]}
        ></img>
        <img
          className="book"
          src={c15}
          alt={titles[c15]}
          title={titles[c15]}
        ></img>
        <img
          className="book"
          src={c16}
          alt={titles[c16]}
          title={titles[c16]}
        ></img>
        <img
          className="book"
          src={c17}
          alt={titles[c17]}
          title={titles[c17]}
        ></img>
        <img
          className="book"
          src={c18}
          alt={titles[c18]}
          title={titles[c18]}
        ></img>
        <img
          className="book"
          src={c19}
          alt={titles[c19]}
          title={titles[c19]}
        ></img>
        <img
          className="book"
          src={c20}
          alt={titles[c20]}
          title={titles[c20]}
        ></img>
        <img
          className="book"
          src={c21}
          alt={titles[c21]}
          title={titles[c21]}
        ></img>
        <img
          className="book"
          src={c22}
          alt={titles[c22]}
          title={titles[c22]}
        ></img>
        <img
          className="book"
          src={c23}
          alt={titles[c23]}
          title={titles[c23]}
        ></img>
        <img
          className="book"
          src={c24}
          alt={titles[c24]}
          title={titles[c24]}
        ></img>
        <img
          className="book"
          src={c25}
          alt={titles[c25]}
          title={titles[c25]}
        ></img>
        <img
          className="book"
          src={c26}
          alt={titles[c26]}
          title={titles[c26]}
        ></img>
        <img
          className="book"
          src={c27}
          alt={titles[c27]}
          title={titles[c27]}
        ></img>
        <img
          className="book"
          src={c28}
          alt={titles[c28]}
          title={titles[c28]}
        ></img>
        <img
          className="book"
          src={c29}
          alt={titles[c29]}
          title={titles[c29]}
        ></img>
        <img
          className="book"
          src={c30}
          alt={titles[c30]}
          title={titles[c30]}
        ></img>
        <img
          className="book"
          src={c31}
          alt={titles[c31]}
          title={titles[c31]}
        ></img>
        <img
          className="book"
          src={c32}
          alt={titles[c32]}
          title={titles[c32]}
        ></img>
        <img
          className="book"
          src={c33}
          alt={titles[c33]}
          title={titles[c33]}
        ></img>
        <img
          className="book"
          src={c34}
          alt={titles[c34]}
          title={titles[c34]}
        ></img>
        <img
          className="book"
          src={c35}
          alt={titles[c35]}
          title={titles[c35]}
        ></img>
        <img
          className="book"
          src={c36}
          alt={titles[c36]}
          title={titles[c36]}
        ></img>
        <img
          className="book"
          src={c37}
          alt={titles[c37]}
          title={titles[c37]}
        ></img>
        <img
          className="book"
          src={c38}
          alt={titles[c38]}
          title={titles[c38]}
        ></img>
        <img
          className="book"
          src={c39}
          alt={titles[c39]}
          title={titles[c39]}
        ></img>
        <img
          className="book"
          src={c40}
          alt={titles[c40]}
          title={titles[c40]}
        ></img>
        <img
          className="book"
          src={c41}
          alt={titles[c41]}
          title={titles[c41]}
        ></img>
        <img
          className="book"
          src={c42}
          alt={titles[c42]}
          title={titles[c42]}
        ></img>
        <img
          className="book"
          src={c43}
          alt={titles[c43]}
          title={titles[c43]}
        ></img>
        <img
          className="book"
          src={c44}
          alt={titles[c44]}
          title={titles[c44]}
        ></img>
        <img
          className="book"
          src={c45}
          alt={titles[c45]}
          title={titles[c45]}
        ></img>
        <img
          className="book"
          src={c46}
          alt={titles[c46]}
          title={titles[c46]}
        ></img>
        <img
          className="book"
          src={c47}
          alt={titles[c47]}
          title={titles[c47]}
        ></img>
        <img
          className="book"
          src={c48}
          alt={titles[c48]}
          title={titles[c48]}
        ></img>
        <img
          className="book"
          src={c49}
          alt={titles[c49]}
          title={titles[c49]}
        ></img>
        <img
          className="book"
          src={c50}
          alt={titles[c50]}
          title={titles[c50]}
        ></img>
        <img
          className="book"
          src={c51}
          alt={titles[c51]}
          title={titles[c51]}
        ></img>
        <img
          className="book"
          src={c52}
          alt={titles[c52]}
          title={titles[c52]}
        ></img>
        <img
          className="book"
          src={c53}
          alt={titles[c53]}
          title={titles[c53]}
        ></img>
        <img
          className="book"
          src={c54}
          alt={titles[c54]}
          title={titles[c54]}
        ></img>
        <img
          className="book"
          src={c55}
          alt={titles[c55]}
          title={titles[c55]}
        ></img>
        <img
          className="book"
          src={c56}
          alt={titles[c56]}
          title={titles[c56]}
        ></img>

        <img
          className="album star"
          src={water}
          alt="The Microphones - It was Hot, we stayed in the water"
          title="The Microphones - It was Hot, we stayed in the water"
        ></img>
        <img
          className="album"
          src={connie}
          alt="Connie Converse - How Sad, How Lovely"
          title="Connie Converse - How Sad, How Lovely"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/dWCXUaPJxNF-Elbfl7YUZzZiC402aiP4KQUBgM3HpVk/rs:fit/g:sm/q:90/h:500/w:500/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1MTcy/NDYtMTIyNTUwNjk3/MC5qcGVn.jpeg"
          alt="Arthur Russel - Love is Overtaking Me"
          title="Arthur Russel - Love is Overtaking Me"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/-TPDOxjQITpy0SkFxeCjHgsTWhUz8TKocSRyr8ICYqo/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM2NjU4/MzUtMTY3NjY5NjI3/NC03OTc5LmpwZWc.jpeg"
          alt="Ramshackle Glory - Live the Dream"
          title="Ramshackle Glory - Live the Dream"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/YhjoHEONf_RFb9EUcXjt3orGv1vBTlvhhKRK2Ltb4aI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNjE4/NzY2LTE1MDEwNTg0/ODgtNjM5Mi5qcGVn.jpeg"
          alt="Nana Grizol - Ursa Minor"
          title="Nana Grizol - Ursa Minor"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/d_08H2Id3o-LqzLnQN72LcihGmeY6QKTTlBupa9HmBs/rs:fit/g:sm/q:90/h:600/w:591/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTc4OTM1/NC0xNjAzMDE3MTk3/LTk1MjEuanBlZw.jpeg"
          alt="Songs: Ohia - The Magnolia Electric Co."
          title="Songs: Ohia - The Magnolia Electric Co."
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/FR9lCzrV0Eqs2V0oFMbICij-ZKSnF_eWZw9x6MkiJVY/rs:fit/g:sm/q:90/h:548/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzE4/NDY0LTE1NTAwOTE5/MzYtNDU0My5qcGVn.jpeg"
          alt="Robyn - Honey"
          title="Robyn - Honey"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/Q-8eWi3F2f4JmB7fT8BsqLvwF3fiCX-OH0wJWh7tsCs/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3Mjgw/ODgtMTM2NjkyMjA4/Ny0yNTAyLmpwZWc.jpeg"
          alt="Bill Callahan - Sometimes I Wish We Were an Eagle"
          title="Bill Callahan - Sometimes I Wish We Were an Eagle"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/A2lx7X0oz1AQCceuSJlFzDmTWtAYf8S0GN-1-gDGvnk/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTExNDI1/ODA2LTE1MTYxMTUx/NDMtNTU3Mi5qcGVn.jpeg"
          alt="Laaraji - Vision Songs Vol. 1"
          title="Laaraji - Vision Songs Vol. 1"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/RuVS-efrxKKAvQXK98YdtyHc6EDfn7Eh3G2N11L8_2U/rs:fit/g:sm/q:90/h:600/w:586/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0MzA2/NS0xNjk5NjI4MzY3/LTcyMDguanBlZw.jpeg"
          alt="Yo La Tengo - I can hear the heart beating as one"
          title="Yo La Tengo - I can hear the heart beating as one"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/-rz_gYvNwQ-Rw_jAbF9IwIiG0SSp6N3aEu5EOZo-AaM/rs:fit/g:sm/q:90/h:600/w:597/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODI1/MDYzLTE1ODIzMjIz/MjAtNzE2Ni5qcGVn.jpeg"
          alt="Swamp Dogg - Sorry You Couldn't Make It"
          title="Swamp Dogg - Sorry You Couldn't Make It"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/58iCXHy_Lx31iEDm1xuSfmpBRjDVVmXj9CXoAfTTDs0/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0Njk4/NzIxLTE1Nzk4ODE0/MDItMTA2Ny5qcGVn.jpeg"
          alt="Andy Shauf - The Neon Skyline"
          title="Andy Shauf - The Neon Skyline"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/BgfL5cm5mkVWFI3L1YFuy7QSgBpyrWEgiZ51Z96XYf4/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE0ODQ3/ODktMTI2NTc3MzI5/MC5qcGVn.jpeg"
          alt="Lucinda Williams - Car Wheels on a Gravel Road"
          title="Lucinda Williams - Car Wheels on a Gravel Road"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/FptRWHXBR9mOYo0OTvy_D3uHy4ny0fBTt_Mn-qR53PI/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzNzI3/NDMzLTE1NTk4NTUx/NjUtODc2NC5qcGVn.jpeg"
          alt="Katie Dey - Solipsisters"
          title="Katie Dey - Solipsisters"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/dGMgrschNI2ZMMp19Eg8ndGSRGy1-JBevujgLq5k1oY/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE3MDUw/MDAtMTQ2ODM5NTY5/MC00MjQwLmpwZWc.jpeg"
          alt="Daniel Johnston - 1990"
          title="Daniel Johnston - 1990"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/IBRO5X1WPDdFXflUG65VpdPzQJVzqUVFlsLoFkRV7vw/rs:fit/g:sm/q:90/h:348/w:386/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE1MDIw/ODItMTIyNDQ2NjIw/Mi5qcGVn.jpeg"
          alt="Chad VanGaalen - Soft Airplane"
          title="Chad VanGaalen - Soft Airplane"
        ></img>
        <img
          className="album"
          src="https://i.discogs.com/Vt0ngf1T_ZeDgVwtDk9ISD-ALFNcenFidkBiN0MRSUY/rs:fit/g:sm/q:90/h:600/w:592/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2MjE2/MjQtMTI1MTA1ODc2/My5qcGVn.jpeg"
          alt="Tom T Hall - Greatest Hits"
          title="Tom T Hall - Greatest Hits"
        ></img>
      </div>

      <span style={{ padding: "2em", width: "100%" }}>
        <a href="https://goodreads.com/maxbittker">
          {" "}
          Goodreads {/* <small>(AMZN)</small> */}
        </a>
      </span>
    </div>
  );
};

export default Games;
export function Shelf() {
  let [hovered, setHovered] = React.useState(false);
  const main = React.useRef(null);

  let bounds = main.current?.getBoundingClientRect();
  let midpoint = (bounds?.left + bounds?.right) / 2;
  let vmidpoint = (bounds?.top + bounds?.bottom) / 2;
  let tx = "TranslateX(0%)";
  let ty = "TranslateY(-50%)";

  let overlayStyle = {};

  if (hovered?.pos?.bottom > vmidpoint) {
    let midpoint = (hovered?.pos?.top + hovered?.pos?.bottom) / 2;
    overlayStyle.bottom = bounds?.bottom - midpoint;
    ty = "TranslateY(50%)";
  } else {
    overlayStyle.top =
      hovered?.pos?.top + hovered?.pos?.height / 2 - bounds?.top;
  }

  if (hovered?.pos?.right < midpoint) {
    overlayStyle.left = hovered?.pos?.right - bounds?.left;
  } else {
    overlayStyle.left = hovered?.pos?.left - bounds?.left;
    tx = "TranslateX(-100%)";
  }
  overlayStyle.transform = tx + " " + ty;
  // main, hovered, overlayStyle, setHovered
  return (
    <div className="main-shelf" ref={main}>
      <img src={shelf}></img>
      <img id="overlay-img" src={hovered?.url} style={overlayStyle}></img>
      <MapSvg
        onMouseEnter={(e) => {
          // console.log(e.target.getBoundingClientRect())
          if (e.target.id == hovered?.url) return;
          setHovered({
            url: e.target.id,
            pos: e.target.getBoundingClientRect(),
          });
          // e.target.style.fill = "yellow";
        }}
        onMouseLeave={(e) => {
          let id = e.target.id;
          setHovered((v) => {
            if (v?.url == id) {
              return { url: null };
            }
            return v;
          });
          e.target.style.fill = "none";
        }}
      ></MapSvg>
    </div>
  );
}
