
const liElemente = document.querySelectorAll('section#Educatie ol li ');


const educatieArray = Array.from(liElemente).map(li => li.textContent.trim());

const educatieFiltrate = educatieArray.filter( x => x.includes('Liceu')) 
if (educatieFiltrate.length > 0) {
    console.log('Educatia filtrata (cele care conțin "Liceu"):');
    console.log(educatieFiltrate);
}

const firstWordArray = educatieArray.map(x => x.split(' ')[0]);
console.log('Primul cuvant din fiecare obiectiv:');
console.log(firstWordArray);

const totalAniStudiu = educatieArray.reduce((total, element) => {
    const ani = element
        .replace(':', '')
        .split('-')
        .map(parte => Number(parte.trim().split(' ')[0]));

    if (ani.length < 2 || Number.isNaN(ani[0]) || Number.isNaN(ani[1])) {
        return total;
    }

    const anStart = ani[0];
    const anFinal = ani[1];
    const durata = anFinal - anStart;

    return total + (durata > 0 ? durata : 0);
}, 0);

console.log(`Total ani de studiu: ${totalAniStudiu}`);

console.log('Lista obiectivelor (array de string-uri):');
console.log(educatieArray);

