// ELEMENTOS HTML

const botoes = document.querySelectorAll(".concluir");

const contador = document.getElementById("contador");

const barra = document.getElementById("barraProgresso");

const tema = document.getElementById("tema");

const reiniciar = document.getElementById("reiniciar");

const relogio = document.getElementById("relogio");

const total = botoes.length;

console.log("Botões:", botoes.length);
console.log("Contador:", contador);
console.log("Barra:", barra);
console.log("Tema:", tema);
console.log("Reiniciar:", reiniciar);
console.log("Relógio:", relogio);
// RECUPERAR MARCAÇÕES

let rotinasSalvas = [];

try {
  
  rotinasSalvas = JSON.parse(
    localStorage.getItem("rotinas")
  ) || [];
  
} catch (erro) {
  
  rotinasSalvas = [];
  
}


// ATUALIZAR PROGRESSO

function atualizarProgresso() {
  
  const concluidos = document.querySelectorAll(
    ".concluir.feito"
  ).length;
  
  contador.textContent =
    `${concluidos} de ${total} rotinas concluídas`;
  
  const porcentagem = total > 0 ?
    (concluidos / total) * 100 :
    0;
  
  barra.style.width = porcentagem + "%";
  
}


// MARCAR ROTINAS

botoes.forEach((botao, index) => {
  
  // Recuperar marcações anteriores
  
  if (rotinasSalvas.includes(index)) {
    
    botao.classList.add("feito");
    
    botao.parentElement.classList.add("finalizado");
    
    botao.textContent = "✓ Concluído";
    
  }
  
  botao.addEventListener("click", function() {
    
    botao.classList.toggle("feito");
    
    botao.parentElement.classList.toggle("finalizado");
    
    if (botao.classList.contains("feito")) {
      
      botao.textContent = "✓ Concluído";
      
      if (!rotinasSalvas.includes(index)) {
        rotinasSalvas.push(index);
      }
      
    } else {
      
      botao.textContent = "Concluir";
      
      rotinasSalvas = rotinasSalvas.filter(
        item => item !== index
      );
      
    }
    
    localStorage.setItem(
      "rotinas",
      JSON.stringify(rotinasSalvas)
    );
    
    atualizarProgresso();
    
  });
  
});


// REINICIAR SEMANA

reiniciar.addEventListener("click", function() {
  rotinasSalvas = [];
  
  localStorage.removeItem("rotinas");
  
  botoes.forEach(botao => {
    botao.classList.remove("feito");
    botao.parentElement.classList.remove("finalizado");
    botao.textContent = "Concluir";
  });
  
  atualizarProgresso();
  
  alert("Semana reiniciada com sucesso!");
});



// MODO ESCURO

function atualizarTema() {
  
  const temaSalvo = localStorage.getItem("tema");
  
  if (temaSalvo === "escuro") {
    
    document.body.classList.add("escuro");
    
    tema.textContent = "☀️ Modo claro";
    
  } else {
    
    document.body.classList.remove("escuro");
    
    tema.textContent = "🌙 Modo escuro";
    
  }
  
}

atualizarTema();


tema.addEventListener("click", function() {
  
  const estaEscuro = document.body.classList.toggle("escuro");
  
  localStorage.setItem(
    "tema",
    estaEscuro ? "escuro" : "claro"
  );
  
  atualizarTema();
  
});


// RELÓGIO

function atualizarRelogio() {
  
  const agora = new Date();
  
  const data = agora.toLocaleDateString("pt-BR");
  
  const horario = agora.toLocaleTimeString("pt-BR");
  
  relogio.textContent = data + " | " + horario;
  
}

atualizarRelogio();

setInterval(atualizarRelogio, 1000);


// INICIAR PROGRESSO

atualizarProgresso();

// REGISTRAR SERVICE WORKER

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js")
    .then(() => {
      console.log("Aplicativo preparado para funcionar offline!");
    })
    .catch(erro => {
      console.error("Erro no Service Worker:", erro);
    });
}
