import{_ as c,F as y,a as w,b as k,c as F,d as E,V as B,e as q,N as p,f as v,g as C,h as U,i as m,j as t,w as s,n as x,k as P,l as u,r as a,o as g,m as N,p as z,q as A}from"./vue-axios.esm.min-0519a168.js";import"./_commonjsHelpers-28e086c5.js";const I={components:{FormGroup:y,FormLabel:w,FormInput:k,FormTextarea:F,FormCheckbox:E,ValidationErrors:B,Feedback:q},data(){return{form:{name:null,firstname:null,party:null,location:null,email:null,quote:null,image:null,copyright:null,confirm_ad_usage:0,confirm_web_usage:0,remarks:null},errors:{name:null,firstname:null,location:null,email:null,quote:null,image:null,confirm_ad_usage:null,confirm_web_usage:null},validationErrors:[],routes:{store:"/api/form/testimonial"},isSent:!1,isLoading:!1}},methods:{submit(){const l=new FormData;l.append("image",this.form.image),l.append("name",this.form.name?this.form.name:""),l.append("firstname",this.form.firstname?this.form.firstname:""),l.append("email",this.form.email?this.form.email:""),l.append("location",this.form.location?this.form.location:""),l.append("party",this.form.party?this.form.party:""),l.append("quote",this.form.quote?this.form.quote:""),l.append("copyright",this.form.copyright?this.form.copyright:""),l.append("remarks",this.form.remarks?this.form.remarks:""),l.append("confirm_ad_usage",this.form.confirm_ad_usage),l.append("confirm_web_usage",this.form.confirm_web_usage),this.isSent=!1,this.isLoading=!0,this.validationErrors=[],p.start(),this.axios.post(this.routes.store,l).then(e=>{p.done(),this.reset(),this.isSent=!0,this.isLoading=!1}).catch(e=>{p.done(),this.isLoading=!1,this.handleValidationErrors(e.response.data)})},toggle(l){this.form[l]=this.form[l]==0?1:0},validateField(l){this.form[l]===null||this.form[l]===""?this.errors[l]=!0:this.errors[l]=!1},validateEmail(){if(this.validEmail()){this.errors.email=!1;return}this.errors.email=!0},validEmail(){return!(this.form.email===null||this.form.email===""||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email))},handleValidationErrors(l){for(let e in l.errors)this.validationErrors.push(l.errors[e][0]),this.errors[e]=!0;window.scrollTo(0,0)},removeError(l){this.errors[l]=null},reset(){this.form={name:null,firstname:null,email:null,party:null,location:null,quote:null,image:null,copyright:null,confirm_ad_usage:0,confirm_web_usage:0,remarks:null},this.errors={}},fileChange(l){this.form.image=l.target.files[0]}},computed:{isValid(){return!!(this.form.name&&this.form.firstname&&this.form.location&&this.validEmail()&&this.form.quote&&this.form.image&&(this.form.confirm_ad_usage==1||this.form.confirm_web_usage==1))}}},L=m("p",null,[u("Vielen Dank für Ihr Interesse, die Kampagne "),m("strong",null,"«JA zur Pistenverlängerung am Flughafen Zürich»"),u(" mit einem Testimonial zu unterstützen. Bitte füllen Sie das untenstehende Formular aus.")],-1),S={class:"mt-20 xl:mt-40",enctype:"multipart/form-data"},Z=m("div",{class:"text-xxs md:text-xs xl:text-sm mb-20"},"Profilbild*",-1),J=m("div",{class:"mt-20"},"Bitte laden Sie ein hochauflösendes Bild hoch, erlaubt sind JPG, PNG, max. 8MB",-1),T=m("strong",null,"«JA zur Pistenverlängerung am Flughafen Zürich»",-1),j=m("strong",null,"«JA zur Pistenverlängerung am Flughafen Zürich»",-1);function D(l,e,K,M,r,n){const V=a("feedback"),b=a("validation-errors"),f=a("form-input"),i=a("form-group"),d=a("form-textarea"),h=a("form-checkbox");return r.isSent?(g(),v(V,{key:0})):(g(),C(P,{key:1},[L,r.validationErrors.length>0?(g(),v(b,{key:0,validationErrors:r.validationErrors},null,8,["validationErrors"])):U("",!0),m("form",S,[t(i,{error:r.errors.firstname},{default:s(()=>[t(f,{type:"text",modelValue:r.form.firstname,"onUpdate:modelValue":e[0]||(e[0]=o=>r.form.firstname=o),placeholder:"Vorname*",error:r.errors.firstname,onBlur:e[1]||(e[1]=o=>n.validateField("firstname")),onFocus:e[2]||(e[2]=o=>n.removeError("firstname"))},null,8,["modelValue","error"])]),_:1},8,["error"]),t(i,{error:r.errors.name},{default:s(()=>[t(f,{type:"text",modelValue:r.form.name,"onUpdate:modelValue":e[3]||(e[3]=o=>r.form.name=o),placeholder:"Name*",error:r.errors.name,onBlur:e[4]||(e[4]=o=>n.validateField("name")),onFocus:e[5]||(e[5]=o=>n.removeError("name"))},null,8,["modelValue","error"])]),_:1},8,["error"]),t(i,{error:r.errors.email},{default:s(()=>[t(f,{type:"text",modelValue:r.form.email,"onUpdate:modelValue":e[6]||(e[6]=o=>r.form.email=o),placeholder:"E-Mail*",error:r.errors.email,onBlur:e[7]||(e[7]=o=>n.validateEmail()),onFocus:e[8]||(e[8]=o=>n.removeError("email"))},null,8,["modelValue","error"])]),_:1},8,["error"]),t(i,null,{default:s(()=>[t(f,{type:"text",modelValue:r.form.party,"onUpdate:modelValue":e[9]||(e[9]=o=>r.form.party=o),placeholder:"Partei"},null,8,["modelValue"])]),_:1}),t(i,{error:r.errors.location},{default:s(()=>[t(f,{type:"text",modelValue:r.form.location,"onUpdate:modelValue":e[10]||(e[10]=o=>r.form.location=o),error:r.errors.location,placeholder:"Wohnort*",onBlur:e[11]||(e[11]=o=>n.validateField("location")),onFocus:e[12]||(e[12]=o=>n.removeError("location"))},null,8,["modelValue","error"])]),_:1},8,["error"]),t(i,{error:r.errors.quote},{default:s(()=>[t(d,{modelValue:r.form.quote,"onUpdate:modelValue":e[13]||(e[13]=o=>r.form.quote=o),error:r.errors.quote,placeholder:"Zitat*",onBlur:e[14]||(e[14]=o=>n.validateField("quote")),onFocus:e[15]||(e[15]=o=>n.removeError("quote"))},null,8,["modelValue","error"])]),_:1},8,["error"]),t(i,{class:x([r.errors.image?"bg-rosewater":"bg-cloud-mist","text-xxs md:text-xs xl:text-sm px-10 py-20"]),error:r.errors.image},{default:s(()=>[Z,m("input",{type:"file",onChange:e[16]||(e[16]=(...o)=>n.fileChange&&n.fileChange(...o)),maxlength:"1",ref:"file",accept:"image/png, image/jpeg"},null,544),J]),_:1},8,["class","error"]),t(i,null,{default:s(()=>[t(d,{modelValue:r.form.copyright,"onUpdate:modelValue":e[17]||(e[17]=o=>r.form.copyright=o),placeholder:"Copyright des Bildes (Falls der/die Urheber/in des Bildes genannt werden soll)"},null,8,["modelValue"])]),_:1}),t(i,null,{default:s(()=>[t(h,{id:"confirm_ad_usage",modelValue:r.form.confirm_ad_usage,"onUpdate:modelValue":e[18]||(e[18]=o=>r.form.confirm_ad_usage=o),onChange:e[19]||(e[19]=o=>n.toggle("confirm_ad_usage"))},{label:s(()=>[u(" Ich bestätige, dass mein Bild und mein Zitat im Rahmen der Kampagne "),T,u(" in Online- und Print-Inseraten verwendet werden dürfen. ")]),_:1},8,["modelValue"])]),_:1}),t(i,null,{default:s(()=>[t(h,{id:"confirm_web_usage",modelValue:r.form.confirm_web_usage,"onUpdate:modelValue":e[20]||(e[20]=o=>r.form.confirm_web_usage=o),onChange:e[21]||(e[21]=o=>n.toggle("confirm_web_usage"))},{label:s(()=>[u(" Ich bestätige, dass mein Bild und mein Zitat auf der Website der Kampagne "),j,u(" verwendet werden dürfen. ")]),_:1},8,["modelValue"])]),_:1}),t(i,null,{default:s(()=>[t(d,{modelValue:r.form.remarks,"onUpdate:modelValue":e[22]||(e[22]=o=>r.form.remarks=o),placeholder:"Bemerkungen"},null,8,["modelValue"])]),_:1}),t(i,{class:"mt-40 md:mt-60 xl:mt-80 !mb-0 xl:!mb-30 flex justify-center w-full"},{default:s(()=>[m("button",{class:x([n.isValid&&!r.isLoading?"bg-midnight text-white hover:bg-cloud-mist hover:text-midnight transition-colors":"bg-cloud-mist pointer-events-none select-none","font-bold text-white py-10 px-25 leading-none inline-flex items-center w-auto text-left"]),type:"button",onClick:e[23]||(e[23]=N(o=>n.submit(),["prevent"]))}," Absenden ",2)]),_:1})])],64))}const G=c(I,[["render",D]]),_=z(G);_.use(A,axios);_.mount("#form-testimonial");