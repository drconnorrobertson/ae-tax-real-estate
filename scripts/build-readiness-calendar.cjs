const fs=require('node:fs'),path=require('node:path');
const root=path.resolve('public'),route='/property-files/tools/property-transaction-calendar/',date='2026-11-21';
const file=path.join(root,route,'index.html');let html=fs.readFileSync(file,'utf8');
const article=fs.readFileSync('content/property-readiness-calendar.html','utf8').trim();
if(!/<article>[\s\S]*?<\/article>/.test(html))throw Error('Calendar article missing');
html=html.replace(/<article>[\s\S]*?<\/article>/,article);
html=html.replace(/<script([^>]*type="application\/ld\+json"[^>]*)>([\s\S]*?)<\/script>/g,(all,attrs,body)=>{const data=JSON.parse(body);function visit(v){if(Array.isArray(v))v.forEach(visit);else if(v&&typeof v==='object'){if(['WebPage','Article'].includes(v['@type']))v.dateModified=date;Object.values(v).forEach(visit);}}visit(data);return '<script'+attrs+'>'+JSON.stringify(data)+'</script>';});
html=html.replace('</article>','<p>Readiness calendar reviewed November 21, 2026. Fictional evidence exercise by AE Tax Advisors.</p></article>');fs.writeFileSync(file,html);
const changed=new Set([route]);let linked=0;
for(const entry of fs.readdirSync(path.join(root,'property-files'),{withFileTypes:true})){
 if(!entry.isDirectory())continue;const rel='/property-files/'+entry.name+'/placed-in-service-evidence/',p=path.join(root,rel,'index.html');if(!fs.existsSync(p))continue;
 let s=fs.readFileSync(p,'utf8');if(!s.includes('</article>'))throw Error('Task article missing '+rel);
 s=s.replace('</article>','<p data-readiness-link><a href="'+route+'">Build the dated readiness evidence timeline</a> to separate acquisition, completion, availability and later component installation. Keep this property-specific worksheet for its distinct scope and reviewer questions.</p></article>');fs.writeFileSync(p,s);changed.add(rel);linked++;
}
if(linked!==22)throw Error('Expected 22 readiness tasks, found '+linked);
const sitemap=path.join(root,'sitemap.xml');let xml=fs.readFileSync(sitemap,'utf8');xml=xml.replace(/<url>([\s\S]*?)<\/url>/g,(all,body)=>{const loc=body.match(/<loc>(.*?)<\/loc>/)[1];if(!changed.has(new URL(loc).pathname))return all;body=/<lastmod>/.test(body)?body.replace(/<lastmod>.*?<\/lastmod>/,'<lastmod>'+date+'</lastmod>'):body+'<lastmod>'+date+'</lastmod>';return '<url>'+body+'</url>';});fs.writeFileSync(sitemap,xml);
console.log(JSON.stringify({readinessCalendar:'expanded',relatedTasksLinked:linked,existingOwnersPreserved:true}));
