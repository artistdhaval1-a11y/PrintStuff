'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Package, Search, ShoppingBag, Trash2, Truck, Upload, X } from 'lucide-react';

const products = [
  ['Zipper Hoodie','320 GSM',[600,550,525,500],['#111827','#374151','#6b7280']],
  ['Regular Hoodie','320 GSM',[550,525,500,475],['#111827','#e5e7eb','#16a085']],
  ['Normal Polo','180 GSM',[450,400,380,350],['#111827','#25266d','#a51d51','#e9e52c','#fff','#888']],
  ['Premium Polo','220 GSM',[475,450,410,380],['#111827','#25266d','#c21f45','#fff','#71b9dd']],
  ['Crew Neck T-Shirt','180 GSM',[450,400,380,350],['#111827','#25266d','#a51d51','#e9e52c','#fff','#888']],
  ['Cap','FREE SIZE',[250,230,210,190],['#fff','#111827']]
] as const;
const tiers=['UP TO 10','UP TO 20','UP TO 50','50+'];
type Product=typeof products[number];

function Mockup({product,color,art,large=false}:{product:Product;color:string;art:string;large?:boolean}){
  const name=product[0],cap=name==='Cap',polo=name.includes('Polo'),hoodie=name.includes('Hoodie');
  return <div className={large?'mockupWrap largeMockup':'mockupWrap'}>
    <svg viewBox="0 0 300 300" className="mockupSvg" aria-label={name}>
      <defs><linearGradient id="fabricGradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={color}/><stop offset=".55" stopColor={color}/><stop offset="1" stopColor="#000" stopOpacity=".28"/></linearGradient></defs>
      {cap?<><path d="M72 130 Q150 65 228 130 L214 177 Q150 150 86 177Z" fill="url(#fabricGradient)"/><path d="M86 177 Q150 150 214 177 Q176 198 130 195 Q100 192 78 180Z" fill={color} stroke="#0003" strokeWidth="2"/><path d="M113 121 Q150 103 188 121" fill="none" stroke="#fff5" strokeWidth="4"/></>:<>
        <path d="M102 50 L68 68 32 105 67 133 83 112 83 255 217 255 217 112 233 133 268 105 232 68 198 50Z" fill="url(#fabricGradient)"/>
        {hoodie&&<path d="M105 50 Q150 82 195 50 L183 30 Q150 15 117 30Z" fill={color} stroke="#0003" strokeWidth="2"/>}
        {polo&&<path d="M116 52 L150 82 184 52 171 45 150 66 129 45Z" fill="#fff2"/>}
        {!hoodie&&<path d="M112 48 L150 72 188 48" fill="none" stroke="#0003" strokeWidth="3"/>}
      </>}
    </svg>
    {art?<div className={cap?'printArea capPrint':'printArea'}><img src={art} alt="Artwork preview"/></div>:<span className="mockupPlaceholder">YOUR ARTWORK</span>}
  </div>;
}

export default function Home(){
  const[q,setQ]=useState(''),[product,setProduct]=useState<Product|null>(null),[qty,setQty]=useState(10),[cart,setCart]=useState(0),[cartOpen,setCartOpen]=useState(false),[tracking,setTracking]=useState(''),[tracked,setTracked]=useState(false),[color,setColor]=useState('#111827'),[art,setArt]=useState('');
  const [cardColors,setCardColors]=useState<Record<string,string>>({});
  const list=products.filter(p=>p[0].toLowerCase().includes(q.toLowerCase())),tier=qty<=10?0:qty<=20?1:qty<=50?2:3;
  function openProduct(p:Product){setProduct(p);setQty(10);setColor(p[3][0]);setArt('')}
  function upload(file:File|undefined){
    if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>setArt(String(reader.result||''));
    reader.readAsDataURL(file);
  }
  return <main>
    <header><div className="logo"><b>PS</b><span>PrintStuff</span></div><nav><a href="#catalog">Catalogue</a><a href="#how">How it works</a><a href="#track">Track order</a></nav><button className="cart" onClick={()=>setCartOpen(true)} aria-label="Open cart"><ShoppingBag size={18}/>{cart}</button></header>
    <section className="hero"><div><label>PREMIUM CUSTOM APPAREL</label><h1>Custom clothing that speaks <i>your brand.</i></h1><p>Choose a product, select a colour, upload your artwork and see a live printing mockup before ordering.</p><div className="buttons"><a href="#catalog">Start an order <ArrowRight size={17}/></a><a className="outline" href="#track">Track order</a></div></div><div className="heroVisual"><div className="orb"></div><Mockup product={products[4]} color="#111827" art="" large/><div className="badge">LIVE<br/><strong>MOCKUP</strong></div></div></section>
    <section id="catalog" className="section"><div className="sectionTop"><div><label>CATALOGUE</label><h2>Choose your product</h2></div><div className="search"><Search size={17}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products"/></div></div><div className="grid">{list.map(p=><article className="card" key={p[0]}><div className="productVisual"><Mockup product={p} color={cardColors[p[0]]||p[3][0]} art=""/><div className="dots">{p[3].map(c=><button className="dotButton" key={c} aria-label={`Show ${p[0]} in ${c}`} title={`Show ${p[0]} in ${c}`} style={{background:c}} onClick={()=>setCardColors(v=>({...v,[p[0]]:c}))}/>)}</div></div><div className="cardBody"><small>{p[1]}</small><h3>{p[0]}</h3><p>High-quality custom printing with comfortable fabric and bulk pricing.</p><div className="from">from <b>₹{p[2][3]}</b></div><button onClick={()=>openProduct(p)}>Customize & order</button></div></article>)}</div></section>
    <section className="pricing"><label>BULK PRICING</label><h2>Better quantity, better price.</h2><div className="priceGrid">{products.map(p=><div key={p[0]}><b>{p[0]}</b>{p[2].map((v,i)=><p key={i}><span>{tiers[i]}</span><strong>₹{v}</strong></p>)}</div>)}</div><small>Shipping extra will be applicable on all orders.</small></section>
    <section id="how" className="how"><label>HOW IT WORKS</label><h2>From artwork to delivery.</h2><div className="steps"><div><Upload/><b>01 Upload artwork</b><span>Share your logo or print file.</span></div><div><Package/><b>02 Confirm order</b><span>Select product, colour, size and quantity.</span></div><div><Clock3/><b>03 We produce</b><span>Track every production stage.</span></div><div><Truck/><b>04 Get delivered</b><span>Receive your finished order.</span></div></div></section>
    <section id="track" className="tracking"><div><label>ORDER TRACKING</label><h2>Know where your order is.</h2><p>Enter your PrintStuff order number to see the latest status.</p></div><div className="trackBox"><input value={tracking} onChange={e=>setTracking(e.target.value)} placeholder="PS-1001"/><button onClick={()=>setTracked(true)}>Track</button>{tracked&&<div className="status"><CheckCircle2/> <span><b>{tracking||'PS-1001'}</b> — Printing</span></div>}</div></section>
    <footer><b>PrintStuff</b><span>Premium custom apparel solutions</span><a href="/admin">Admin portal →</a></footer>

    {product&&<div className="modal"><div className="shade" onClick={()=>setProduct(null)}/><aside><button className="close" onClick={()=>setProduct(null)}><X size={20}/></button><small>{product[1]}</small><h2>{product[0]}</h2><p className="selectedColourLabel">Selected colour <b>{color}</b></p><div className="customPreview"><Mockup product={product} color={color} art={art} large/></div><h4>Colour</h4><div className="colorChoices">{product[3].map(c=><button key={c} aria-label={c} className={color===c?'selectedColor':''} style={{background:c}} onClick={()=>setColor(c)}/>)}</div><h4>Quantity</h4><div className="qty"><button onClick={()=>setQty(Math.max(1,qty-1))}>−</button><b>{qty}</b><button onClick={()=>setQty(qty+1)}>+</button></div><p className="quote">₹{product[2][tier]} / piece <b>₹{product[2][tier]*qty}</b></p><label className="uploadBox"><Upload/> {art?'Artwork uploaded — change file':'Upload artwork'}<input type="file" accept=".png,.jpg,.jpeg,.webp,.svg,image/png,image/jpeg,image/webp,image/svg+xml" onChange={e=>upload(e.target.files?.[0])}/></label>{art&&<button className="removeArt" onClick={()=>setArt('')}><Trash2 size={15}/> Remove artwork</button>}<button className="add" onClick={()=>{setCart(c=>c+qty);setProduct(null);setCartOpen(true)}}>Add to order</button></aside></div>}
    {cartOpen&&<div className="cartModal"><div className="shade" onClick={()=>setCartOpen(false)}/><aside className="cartDrawer"><button className="close" onClick={()=>setCartOpen(false)}><X size={20}/></button><h2>Your cart</h2>{cart?<><p><b>{cart}</b> item(s) added to your order.</p><div className="cartSummary">Your customized products are ready for checkout.</div><button className="add">Proceed to checkout</button></>:<div className="emptyCart"><ShoppingBag size={42}/><h3>Your cart is empty</h3><p>Add a customized product to start your order.</p><button className="add" onClick={()=>{setCartOpen(false);document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}}>Browse products</button></div>}</aside></div>}
  </main>
}