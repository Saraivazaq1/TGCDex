let json = null;

let tecla = null;
let i = 0;

async function mostrarCarta() {
	let response = await fetch("https://api.tcgdex.net/v2/en/cards");

	json = await response.json();
	json = json.filter((val) => {
		return val.image != undefined
	})
	return json;

}

async function carregarImagem(url) {
	let pokemonAtual = await (await fetch("https://api.tcgdex.net/v2/en/cards/" + json[i].id)).json()
    background(220)
	try {
		let imagem = loadImage(url + '/low.jpg', () => {
			image(imagem, 0, 0, 250, 350)
		})
        
        stroke(0)
        strokeWeight(0.5)
        fill(0)
        textSize(15)
        text("Nome: " + pokemonAtual.name, 50, 400)
        text("Vida: " + pokemonAtual.hp, 50, 450)
      
	} catch (err) {
		console.log("Deu errado");
	}
}

// function elementoAleatorio(array) {
// 	return array[Math.floor(Math.random()*array.length)]
// }


// function mousePressed() {
// 	if ((elementoAleatorio(json)).hasOwnProperty("image")) {
// 		if (json) {
// 			elemento = elementoAleatorio(json).image
// 			carregarImagem(elemento)
// 			console.log(elemento)
// 		}

// 	} else {

// 	}
// }

function keyPressed() {
	if (key === "d" || keyCode === RIGHT_ARROW) {
		i++	

	} else if (key === "a" || keyCode === LEFT_ARROW) {
		i--
	}

	if (i < 0) {
		i = 0
		console.log("Ta errado 👍")
	}
	elemento = json[i].image
	carregarImagem(elemento)


}

async function setup() {
	createCanvas(500, 500);
	background(220)

	json = await mostrarCarta();
	elemento = json[i].image
	carregarImagem(elemento)
}

function draw() {

}
