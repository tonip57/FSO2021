(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var r=t(16),c=t.n(r),a=t(3),o=t(1),u=t(0),i=function(e){return Object(u.jsx)("form",{children:Object(u.jsxs)("div",{children:["filter shown with: ",Object(u.jsx)("input",{value:e.filter,onChange:e.handleFilterChange()})]})})},l=function(e){return Object(u.jsxs)("form",{onSubmit:e.addPerson(),children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:e.newName,onChange:e.handleNameChange()})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange()})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})},s=function(e){return Object(u.jsx)("ul",{children:e.personsShown.map((function(n){return Object(u.jsxs)("li",{className:"personList",children:[n.name," ",n.number,Object(u.jsx)("button",{type:"submit",onClick:function(){return e.handleClick(n.id,n.name)},children:"delete"})]},n.name)}))})},d=t(4),f=t.n(d),j="/api/persons",b=function(){return f.a.get(j)},h=function(e){return f.a.post(j,e)},m=function(e,n){return f.a.put("".concat(j,"/").concat(e),n).then((function(e){return e.data}))},O=function(e){return f.a.delete("".concat(j,"/").concat(e))},p=function(e){var n=e.message;return null===n?null:n.includes("Error")?Object(u.jsx)("div",{className:"error",children:n}):Object(u.jsx)("div",{className:"notifi",children:n})},v=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(t),d=Object(a.a)(c,2),f=d[0],j=d[1],v=Object(o.useState)(""),g=Object(a.a)(v,2),x=g[0],w=g[1],C=Object(o.useState)(""),N=Object(a.a)(C,2),y=N[0],S=N[1],k=Object(o.useState)(""),D=Object(a.a)(k,2),E=D[0],L=D[1],P=Object(o.useState)(null),T=Object(a.a)(P,2),F=T[0],J=T[1];Object(o.useEffect)((function(){b().then((function(e){console.log("promise fulfilled"),r(e.data),j(e.data)}))}),[]);var A=function(e){if(e.preventDefault(),""===x||""===y)return console.log("name/number cannot be empty"),J("Error: name/number cannot be empty"),void setTimeout((function(){J(null)}),5e3);if(t.some((function(e){return e.name===x}))){for(var n,c=0;c<t.length;c++)t[c].name===x&&(n=t[c].id);B(n,x)}else{h({name:x,number:y}).then((function(e){r(t.concat(e.data)),w(""),S(""),L(""),j(t.concat(e.data))})),J("'".concat(x,"' Added")),setTimeout((function(){J(null)}),5e3)}},B=function(e,n){window.confirm("".concat(n," is already added to phonebook, replace the old number with a new one?"))&&m(e,{name:n,number:y}).then((function(n){r(t.map((function(t){return t.id!==e?t:n}))),j(t.map((function(t){return t.id!==e?t:n}))),w(""),S(""),L("")})).catch((function(e){J("Error, '".concat(n,"' was already removed from server")),setTimeout((function(){J(null)}),5e3),w(""),S(""),L("")}))},I=function(e){e.preventDefault(),console.log(e.target.value),w(e.target.value)},q=function(e){e.preventDefault(),console.log(e.target.value),S(e.target.value)},z=function(e){e.preventDefault(),console.log(e.target.value),L(e.target.value),j(t.filter((function(n){return n.name.toLowerCase().includes(e.target.value.toLowerCase())}))),console.log(f)};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(p,{message:F}),Object(u.jsx)(i,{handleFilterChange:function(){return z},filter:E}),Object(u.jsx)("h2",{children:"add a new"}),Object(u.jsx)(l,{handleNameChange:function(){return I},newName:x,addPerson:function(){return A},newNumber:y,handleNumberChange:function(){return q}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)(s,{personsShown:f,handleClick:function(e,n){return function(e,n){window.confirm("Do you really want to delete '"+n+"' ?")&&O(e).then((function(n){var c=t.filter((function(n){return n.id!==e}));r(c),j(c),w(""),S(""),L("")}))}(e,n)}})]})};t(40);c.a.render(Object(u.jsx)(v,{}),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.2806e910.chunk.js.map