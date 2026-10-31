// The Olive Grove premium storefront — frontend demonstration.
// WhatsApp number is configured once in js/store-config.js.
const products = [
 {id:1,name:"Extra Virgin Olive Oil",category:"premium",label:"Signature selection",size:"500 ml",price:2450,desc:"A beautifully balanced expression for finishing, dipping and everyday moments.",notes:"A considered kitchen essential with a refined, versatile character.",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=90"},
 {id:2,name:"Organic Extra Virgin Olive Oil",category:"everyday",label:"Daily ritual",size:"1 Litre",price:3850,desc:"A generous pantry companion for cooking and sharing.",notes:"Created for the rhythm of everyday cooking and the pleasure of gathering.",img:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=90"},
 {id:3,name:"Cold Pressed Olive Oil",category:"premium",label:"Limited edition",size:"750 ml",price:4200,desc:"A special selection for slow meals and memorable tables.",notes:"A beautiful centrepiece for food lovers and thoughtful hosts.",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=90"},
 {id:4,name:"Premium Selection Olive Oil",category:"everyday",label:"Kitchen essential",size:"250 ml",price:1450,desc:"A smaller format for dressings, dips and finishing touches.",notes:"An easy introduction to The Olive Grove way of enjoying olive oil.",img:"https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=1000&q=90"},
 {id:5,name:"Classic Olive Oil",category:"gift",label:"Gift edition",size:"2 × 250 ml",price:3350,desc:"Two considered bottles, beautifully suited to sharing.",notes:"A thoughtful gift for celebrations, hosts and curious cooks.",img:"https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1000&q=90"},
 {id:6,name:"The Olive Grove Gift Collection",category:"gift",label:"Discover collection",size:"3 × 100 ml",price:2250,desc:"A curated introduction to The Olive Grove collection.",notes:"A tasting set designed to explore different moments and pairings.",img:"https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1000&q=90"}
];
let cart = JSON.parse(localStorage.getItem("ogLuxuryCart") || "[]");
let wishlist = JSON.parse(localStorage.getItem("ogLuxuryWishlist") || "[]");
const money = n => "Rs. " + Number(n).toLocaleString("en-PK");
const productById = id => products.find(p => p.id === Number(id));
function saveState(){localStorage.setItem("ogLuxuryCart",JSON.stringify(cart));localStorage.setItem("ogLuxuryWishlist",JSON.stringify(wishlist));renderBag();renderWishlistCount();}
function renderProducts(){
 const q=($("#searchProducts").val()||"").toLowerCase().trim();
 const filter=$(".filter-btn.active").data("filter")||"all";
 const found=products.filter(p=>(filter==="all"||p.category===filter)&&(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||p.size.toLowerCase().includes(q)));
 $("#productCount").text(String(found.length).padStart(2,"0")+" PIECES");
 $("#productGrid").html(found.length?found.map(p=>`
 <div class="col-sm-6 col-lg-4"><article class="product-card">
 <div class="product-photo"><img src="${p.img}" alt="${p.name}" loading="lazy" onload="this.classList.add('image-loaded')" onerror="this.classList.add('image-error')"><span class="product-label">${p.label}</span><button class="wish-btn ${wishlist.includes(p.id)?"active":""}" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist"><i class="bi ${wishlist.includes(p.id)?"bi-heart-fill":"bi-heart"}"></i></button></div>
 <div class="product-detail"><div class="product-category">${p.category==="premium"?"THE SIGNATURE COLLECTION":p.category==="gift"?"THE GIFT EDITIONS":"EVERYDAY COLLECTION"}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="product-foot"><div class="product-price">${money(p.price)} <small>/ ${p.size}</small></div><div class="product-actions"><button class="view-btn" type="button" data-view="${p.id}"><i class="bi bi-eye me-1"></i> View details</button><button class="add-btn" type="button" data-add="${p.id}" aria-label="Add ${p.name} to bag"><i class="bi bi-bag-plus"></i><span class="add-btn-label"> Add to bag</span></button></div></div></div>
 </article></div>`).join(""):'<div class="col-12 text-center py-5 text-muted">No pieces found. Try another search.</div>');
}
function renderBag(){
 const count=cart.reduce((s,x)=>s+x.qty,0),sub=cart.reduce((s,x)=>{const p=productById(x.id);return s+(p?p.price*x.qty:0)},0);
 $("#bagCount").text(count);$("#bagSubtotal,#checkoutSubtotal").text(money(sub));$("#checkoutOpen").prop("disabled",count===0);
 $("#bagEmpty").toggle(count===0);$("#bagItems").toggle(count>0);
 $("#bagItems").html(cart.map(x=>{const p=productById(x.id);if(!p)return "";return `<div class="bag-row"><img src="${p.img}" alt="${p.name}"><div><h6>${p.name}</h6><small>${p.size} · ${money(p.price)}</small><div class="quantity"><button data-qty="${p.id}" data-step="-1" aria-label="Decrease">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-step="1" aria-label="Increase">+</button></div></div><div class="text-end"><strong class="small">${money(p.price*x.qty)}</strong><button class="remove-btn d-block ms-auto mt-2" data-remove="${p.id}">REMOVE</button></div></div>`}).join(""));
}
function renderWishlistCount(){$("#wishCount").text(wishlist.length);}
function addToBag(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});saveState();toast("Added to your bag");}
function toggleWish(id){wishlist=wishlist.includes(id)?wishlist.filter(x=>x!==id):[...wishlist,id];saveState();renderProducts();toast(wishlist.includes(id)?"Saved to your wishlist":"Removed from wishlist");}
function toast(msg){$("#toastText").text(msg);bootstrap.Toast.getOrCreateInstance(document.getElementById("siteToast"),{delay:2200}).show();}
function showProduct(id){const p=productById(id);if(!p)return;$("#productModalContent").html(`<div class="product-modal-grid"><img src="${p.img}" alt="${p.name}"><div class="product-modal-copy"><div class="kicker dark">THE OLIVE GROVE · ${p.label.toUpperCase()}</div><h3>${p.name}</h3><p>${p.desc}</p><p>${p.notes}</p><div class="modal-price">${money(p.price)} <span class="text-muted fw-normal small">/ ${p.size}</span></div><button class="button-green w-100" data-modal-add="${p.id}">Add to bag <i class="bi bi-bag-plus"></i></button><p class="fine-print mt-3">Product descriptions and pricing are sample content. Confirm all details before launch.</p></div></div>`);bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).show();}
$(function(){
 $("#year").text(new Date().getFullYear());renderProducts();renderBag();renderWishlistCount();
 $("#searchProducts").on("input",renderProducts);
 $(".filter-btn").on("click",function(){$(".filter-btn").removeClass("active");$(this).addClass("active");renderProducts();});
 $(document).on("click","[data-add]",function(){addToBag(Number($(this).data("add")))});
 $(document).on("click","[data-modal-add]",function(){addToBag(Number($(this).data("modal-add")));bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).hide();});
 $(document).on("click","[data-view]",function(){showProduct($(this).data("view"))});
 $(document).on("click","[data-wish]",function(){toggleWish(Number($(this).data("wish")))});
 $(document).on("click","[data-qty]",function(){const id=Number($(this).data("qty")),item=cart.find(x=>x.id===id);if(item){item.qty+=Number($(this).data("step"));if(item.qty<1)cart=cart.filter(x=>x.id!==id);saveState();}});
 $(document).on("click","[data-remove]",function(){cart=cart.filter(x=>x.id!==Number($(this).data("remove")));saveState();});
 $("#wishlistNav").on("click",function(){if(!wishlist.length){toast("Your wishlist is waiting for a favourite.");return;}const names=wishlist.map(id=>productById(id)?.name).filter(Boolean).join(", ");toast("Wishlist: "+names);document.querySelector("#collection").scrollIntoView({behavior:"smooth"});});
 $("#checkoutOpen").on("click",function(){if(!cart.length)return;window.location.href="checkout.html";});
 $("#contactForm").on("submit",function(e){e.preventDefault();const f=this;if(!f.checkValidity()){e.stopPropagation();$(f).addClass("was-validated");return;}const name=$("#contactName").val(),email=$("#contactEmail").val(),topic=$("#contactTopic").val(),msg=$("#contactMessage").val();$("#contactFeedback").text("Thank you. Your email application will open with the enquiry ready to send.");window.location.href=`mailto:hello@olivegold.example?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent("Name: "+name+"\\nEmail: "+email+"\\n\\n"+msg)}`;f.reset();$(f).removeClass("was-validated");});
 $("#newsletterForm").on("submit",function(e){e.preventDefault();const email=$("#newsletterEmail").val();if(!email||!$("#newsletterEmail")[0].checkValidity())return;$("#newsletterMessage").text("Thank you for joining The Olive Grove list. Newsletter delivery needs a mailing-list service connection.");this.reset();});
 $("#checkoutForm").on("submit",function(e){e.preventDefault();const f=this;if(!f.checkValidity()){e.stopPropagation();$(f).addClass("was-validated");return;}if(!cart.length)return;const customer={name:$("#buyerName").val().trim(),phone:$("#buyerPhone").val().trim(),address:$("#buyerAddress").val().trim(),city:$("#buyerCity").val().trim(),notes:$("#buyerNotes").val().trim()};try{const message=OGOrder.createMessage(cart,products,customer);OGOrder.openWhatsApp(message);$("#checkoutFeedback").text("WhatsApp opened with your order. Review the message and press Send.");}catch(error){$("#checkoutFeedback").text(error.message);}});
 $(".navbar-nav .nav-link").on("click",function(){const el=document.getElementById("navMenu");if(el.classList.contains("show"))bootstrap.Collapse.getOrCreateInstance(el).hide();});
});
// Accessible reveal-on-scroll animation for editorial sections and cards.
function initGroveScrollReveal(){
 const selector='main section, .page-hero, .page-section .row > [class*="col-"], .feature-card, .product-tile, .product-card, .journal-card, .value-item';
 if(!('IntersectionObserver' in window)){document.querySelectorAll(selector).forEach(el=>el.classList.add('is-visible'));return;}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});
 const reveal=el=>{if(!el.classList.contains('reveal-on-scroll'))el.classList.add('reveal-on-scroll');observer.observe(el);};
 document.querySelectorAll(selector).forEach((el,i)=>{if(el.matches('.product-card,.product-tile'))el.style.setProperty('--reveal-delay',`${(i%3)*110}ms`);reveal(el);});
 const dynamicObserver=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType!==1)return;if(node.matches(selector)){node.style.setProperty('--reveal-delay',`${(node.parentElement?.children.length||1)%3*110}ms`);reveal(node);}node.querySelectorAll?.(selector).forEach((el,i)=>{if(el.matches('.product-card,.product-tile'))el.style.setProperty('--reveal-delay',`${(i%3)*110}ms`);reveal(el);});} )));
 dynamicObserver.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initGroveScrollReveal);else initGroveScrollReveal();
