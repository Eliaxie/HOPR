(this["webpackJsonphopr-demo-react-hello-world"]=this["webpackJsonphopr-demo-react-hello-world"]||[]).push([[0],{13:function(e,t,s){},14:function(e,t,s){"use strict";s.r(t);var n=s(5),c=s(6),r=s(2),a=s(4),o=s.n(a),l=s(1),i=s(0),j=function(e){var t=e.response;return Object(i.jsxs)("div",{className:"response",children:[" ",t?Object(i.jsxs)("ul",{className:"obj collapsible",children:[Object(i.jsx)("li",{children:Object(i.jsxs)("div",{className:"hoverable",children:[Object(i.jsx)("span",{className:"property token string",children:"Status:"}),": ",Object(i.jsx)("span",{className:"token string",children:204===(null===t||void 0===t?void 0:t.status)?Object(i.jsx)("span",{children:"success"}):Object(i.jsx)("span",{style:{color:"red"},children:" failure"})}),Object(i.jsx)("span",{className:"token punctuation",children:","})]})})," ",204===t.status?Object(i.jsx)("li",{children:Object(i.jsxs)("div",{className:"hoverable",children:[Object(i.jsx)("span",{className:"property token string",children:"Ok:"}),": ",Object(i.jsxs)("span",{className:"token string",children:[" ",t.ok?"true":"false"]})]})}):Object(i.jsx)("li",{children:Object(i.jsxs)("div",{className:"hoverable",children:[Object(i.jsx)("span",{className:"property token string",children:"Error:"}),": ",Object(i.jsxs)("span",{className:"token string",children:[" ",t.statusText," "]})]})})," "]}):Object(i.jsx)(i.Fragment,{})]})};s(13);function b(){var e=Object(l.useState)("Hello world"),t=Object(r.a)(e,2),s=t[0],n=t[1],a=Object(l.useState)("^^LOCAL-testing-123^^"),b=Object(r.a)(a,2),u=b[0],d=b[1],p=Object(l.useState)("http://127.0.0.1:13301"),O=Object(r.a)(p,2),x=O[0],h=O[1],m=Object(l.useState)("16Uiu2HAmEr9FRBxgpnmvubnH56hgfLZmQi4BMn8kM8EBxusa9X36"),v=Object(r.a)(m,2),f=v[0],g=v[1],N=Object(l.useState)(),y=Object(r.a)(N,2),k=y[0],S=y[1],T=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=new Headers;return e&&(t.set("Content-Type","application/json"),t.set("Accept-Content","application/json")),t.set("Authorization","Basic "+btoa(u)),t},w=function(){var e=Object(c.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(f){e.next=2;break}return e.abrupt("return");case 2:return t={method:"POST",headers:T(!0),body:JSON.stringify({recipient:f,body:"$&RelayedTx&$"+s})},console.log("request",t),e.next=6,fetch("".concat(x,"/api/v2/messages"),t).catch((function(e){return console.error(e)}));case 6:n=e.sent,S(n),console.log("response",n);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(i.jsx)("div",{className:"flex",children:Object(i.jsx)("div",{className:"flex-container",children:Object(i.jsx)("div",{className:"content-container",children:Object(i.jsxs)("div",{className:"form-container",children:[Object(i.jsxs)("form",{children:[Object(i.jsx)("h1",{children:"Send transaction"}),Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"subtitle",children:"Local HTTP Endpoint:"}),Object(i.jsx)("br",{}),Object(i.jsx)("input",{name:"httpEndpoint of local node",placeholder:x,type:"text",value:x,onChange:function(e){return h(e.target.value)}}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"subtitle",children:"Remote Address:"}),Object(i.jsx)("br",{}),Object(i.jsx)("input",{name:"Address of remote node",placeholder:f,value:f,type:"text",onChange:function(e){return g(e.target.value)}}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"subtitle",children:"Security Token:"}),Object(i.jsx)("br",{}),Object(i.jsx)("input",{name:"securityToken",placeholder:u,value:u,type:"text",onChange:function(e){return d(e.target.value)}}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"subtitle",children:"Transaction:"}),Object(i.jsx)("br",{}),Object(i.jsx)("input",{name:"httpEndpoint",value:s,placeholder:s,type:"text",onChange:function(e){return n(e.target.value)}}),Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),Object(i.jsx)("input",{value:"Send",type:"button",className:"submit-btn",onClick:function(){return w()}})]}),Object(i.jsx)(j,{response:k})]})})})})}var u=document.getElementById("root");Object(n.render)(Object(i.jsx)(b,{}),u)}},[[14,1,2]]]);
//# sourceMappingURL=main.06c119d3.chunk.js.map