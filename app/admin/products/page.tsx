'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = { name:string; fabric:string; prices:number[]; colors:string[]; image:string; category:string; sku?:string; sizes?:string[] };
const starter:Product[] = [
  {name:'Zipper Hoodie',fabric:'320 GSM',prices:[600,600,600,600],colors:['Black','Charcoal','Grey'],image:'/products/zipper-hoodie.webp',category:'HOODIES',sku:'',sizes:['S','M','L','XL','XXL']},
  {name:'Regular Hoodie',fabric:'320 GSM',prices:[550,550,550,550],colors:['Black','White','Green'],image:'/products/regular-hoodie.webp',category:'HOODIES',sku:'',sizes:['S','M','L','XL','XXL']},
  {name:'Normal Polo',fabric:'180 GSM',prices:[450,450,450,450],colors:['Black','Navy','Maroon','Yellow','White','Grey'],image:'/products/normal-polo.webp',category:'T-SHIRTS',sku:'',sizes:['S','M','L','XL','XXL']},
  {name:'Premium Polo',fabric:'220 GSM',prices:[475,475,475,475],colors:['Black','Navy','Red','White','Sky Blue'],image:'/products/premium-polo.webp',category:'T-SHIRTS',sku:'',sizes:['S','M','L','XL','XXL']},
  {name:'Crew Neck T-Shirt',fabric:'180 GSM',prices:[450,450,450,450],colors:['Black','Navy','Maroon','Yellow','White','Grey'],image:'/products/crew-neck.webp',category:'T-SHIRTS',sku:'',sizes:['S','M','L','XL','XXL']},
  {name:'Cap',fabric:'FREE SIZE',prices:[250,250,250,250],colors:['White','Black'],image:'/products/cap.webp',category:'ACCESSORIES',sku:'',sizes:['Free size']}
];
const blank:Product={name:'',fabric:'',prices:[0,0,0,0],colors:['Black'],image:'',category:'T-SHIRTS',sku:'',sizes:['S','M','L','XL','XXL']};
export default function ProductAdmin(){
 const [items,setItems]=useState<Product[]>(starter); const [form,setForm]=useState<Product>(blank); const [editing,setEditing]=useState<number|null>(null); const [notice,setNotice]=useState('');
 useEffect(()=>{try{const raw=localStorage.getItem('printstuff-products');if(raw){const data=JSON.parse(raw);if(Array.isArray(data))setItems(data)}}catch{}},[]);
 function persist(next:Product[]){setItems(next);try{localStorage.setItem('printstuff-products',JSON.stringify(next));setNotice('Saved in this browser. Storefront catalogue updates in this browser.')}catch{setNotice('Could not save catalogue in this browser. Image URLs are recommended instead of large image uploads.')}}
 function edit(i:number){setEditing(i);setForm({...items[i],prices:[...items[i].prices],colors:[...items[i].colors],sizes:[...(items[i].sizes||[])]});setNotice('')}
 function reset(){setForm(blank);setEditing(null)}
 function save(){if(!form.name.trim()||!form.image.trim()||!form.prices[0]||!form.colors.length){setNotice('Enter product name, image URL, retail price and at least one colour.');return}const normalized={...form,name:form.name.trim(),prices:[Number(form.prices[0]),Number(form.prices[0]),Number(form.prices[0]),Number(form.prices[0])],colors:form.colors.map(x=>x.trim()).filter(Boolean),sizes:(form.sizes||[]).map(x=>x.trim()).filter(Boolean)};const next=[...items];if(editing===null)next.push(normalized);else next[editing]=normalized;persist(next);reset()}
 function remove(i:number){if(!confirm('Remove this product from this browser catalogue?'))return;persist(items.filter((_,n)=>n!==i));if(editing===i)reset()}
 const field:React.CSSProperties={width:'100%',padding:'11px 12px',border:'1px solid #d9ded7',borderRadius:8,background:'#fff',font:'inherit',color:'#18211f'};
 return <main style={{minHeight:'100vh',background:'#f5f4ef',color:'#18211f',fontFamily:'Arial,sans-serif'}}>
  <header style={{padding:'18px 5vw',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid #dfe1d9',background:'#fff'}}><b style={{fontSize:20}}>PrintStuff · Product Manager</b><Link href="/" style={{color:'#18211f'}}>View store ↗</Link></header>
  <div style={{maxWidth:1180,margin:'32px auto',padding:'0 20px',display:'grid',gridTemplateColumns:'minmax(280px, .8fr) minmax(320px,1.2fr)',gap:24}}>
   <section style={{background:'#fff',padding:24,borderRadius:14,border:'1px solid #e0e3dc',alignSelf:'start'}}>
    <small style={{letterSpacing:2,color:'#637069'}}>CATALOGUE ADMIN</small><h1 style={{fontSize:28,margin:'10px 0 6px'}}>{editing===null?'Add a product':'Edit product'}</h1><p style={{color:'#68736d',lineHeight:1.5,fontSize:14}}>Manage product details shown in the storefront. Use a public image URL and enter the Qikink SKU for fulfilment mapping.</p>
    <div style={{display:'grid',gap:12}}>
     <label>Product name<input style={field} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Classic Crew Neck T-Shirt"/></label>
     <label>Qikink SKU<input style={field} value={form.sku||''} onChange={e=>setForm({...form,sku:e.target.value})} placeholder="SKU from Qikink"/></label>
     <label>Product image URL<input style={field} value={form.image} onChange={e=>setForm({...form,image:e.target.value})} placeholder="https://..."/></label>
     <label>Retail price (₹)<input type="number" min="1" style={field} value={form.prices[0]||''} onChange={e=>setForm({...form,prices:[Number(e.target.value),Number(e.target.value),Number(e.target.value),Number(e.target.value)]})} placeholder="399"/></label>
     <label>Category<select style={field} value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>T-SHIRTS</option><option>HOODIES</option><option>ACCESSORIES</option><option>OTHER</option></select></label>
     <label>Fabric / description<input style={field} value={form.fabric} onChange={e=>setForm({...form,fabric:e.target.value})} placeholder="180 GSM cotton"/></label>
     <label>Colours (comma-separated)<input style={field} value={form.colors.join(', ')} onChange={e=>setForm({...form,colors:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)})} placeholder="Black, White, Navy"/></label>
     <label>Sizes (comma-separated)<input style={field} value={(form.sizes||[]).join(', ')} onChange={e=>setForm({...form,sizes:e.target.value.split(',').map(x=>x.trim()).filter(Boolean)})} placeholder="S, M, L, XL, XXL"/></label>
     {form.image&&<img src={form.image} alt="Product preview" style={{width:'100%',maxHeight:220,objectFit:'contain',background:'#f4f5f1',borderRadius:8}}/>}
     <div style={{display:'flex',gap:10}}><button onClick={save} style={{border:0,borderRadius:8,padding:'12px 18px',background:'#18211f',color:'#fff',fontWeight:700,cursor:'pointer'}}>{editing===null?'Add product':'Save changes'}</button>{editing!==null&&<button onClick={reset} style={{border:'1px solid #d9ded7',borderRadius:8,padding:'12px 18px',background:'#fff',cursor:'pointer'}}>Cancel</button>}</div>
     {notice&&<p role="status" style={{fontSize:13,lineHeight:1.5,color:'#3c6a42'}}>{notice}</p>}
    </div>
   </section>
   <section style={{background:'#fff',padding:24,borderRadius:14,border:'1px solid #e0e3dc'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}><div><small style={{letterSpacing:2,color:'#637069'}}>STORE CATALOGUE</small><h2 style={{fontSize:25,margin:'8px 0 18px'}}>Products ({items.length})</h2></div><button onClick={()=>{if(confirm('Restore the starter catalogue in this browser?'))persist(starter)}} style={{background:'#fff',border:'1px solid #d9ded7',borderRadius:8,padding:10,cursor:'pointer'}}>Reset demo</button></div>
    <div style={{display:'grid',gap:10}}>{items.map((p,i)=><article key={p.name+'-'+i} style={{display:'grid',gridTemplateColumns:'76px 1fr auto',gap:12,alignItems:'center',padding:'12px 0',borderBottom:'1px solid #edf0ea'}}><img src={p.image} alt="" style={{width:76,height:76,objectFit:'contain',background:'#f4f5f1',borderRadius:8}}/><div><b>{p.name}</b><div style={{fontSize:13,color:'#68736d',marginTop:5}}>{p.sku||'SKU not set'} · {p.category} · ₹{p.prices[0]}</div><div style={{fontSize:12,color:'#68736d',marginTop:4}}>{p.colors.join(', ')} · {(p.sizes||[]).join(', ')}</div></div><div style={{display:'grid',gap:6}}><button onClick={()=>edit(i)} style={{padding:'7px 10px',border:'1px solid #d9ded7',background:'#fff',borderRadius:7,cursor:'pointer'}}>Edit</button><button onClick={()=>remove(i)} style={{padding:'7px 10px',border:'1px solid #e6c8c8',background:'#fff',borderRadius:7,color:'#a23b3b',cursor:'pointer'}}>Remove</button></div></article>)}</div>
   </section>
  </div>
  <p style={{maxWidth:1180,margin:'0 auto',padding:'0 20px 28px',fontSize:13,color:'#68736d',lineHeight:1.6}}>Important: this first-stage manager stores changes in this browser only. It is a development prototype, not yet a shared database for all customers. Before launch, connect persistent database storage and admin authentication. Qikink does not provide product sync for custom stores, so products must be entered here manually until another supported data source is available.</p>
 </main>
}
