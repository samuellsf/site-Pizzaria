// Seletores
const menuContent = document.querySelector('.content');
const menuToggle = document.querySelector('.menu-toggle');
const btnReservar = document.querySelector('.reservar');
const btnMontar = document.querySelector('.montar');
const botoesPedir = document.querySelectorAll('.pedir');

// Função: abrir/fechar menu responsivo
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuContent.classList.contains('on');
    document.body.style.overflow = isOpen ? 'initial' : 'hidden';
    menuContent.classList.toggle('on');
    console.log(isOpen ? 'Menu fechado.' : 'Menu aberto.');
  });
}

// Função: clique em "Reservar a sua"
btnReservar?.addEventListener('click', () => {
  alert('Você clicou em "Reservar a sua!"');
  console.log('Ação: reserva solicitada.');
});

// Função: clique em "Montar a sua pizza"
btnMontar?.addEventListener('click', () => {
  alert('Você escolheu montar sua pizza! Personalize como quiser.');
  console.log('Ação: montagem personalizada iniciada.');
});

// === Função: salva pedido no localStorage ===
function salvarPedidoLocal(pedido) {
  const pedidos = JSON.parse(localStorage.getItem('pedidosPizzaGurupi')) || [];
  pedidos.push(pedido);
  localStorage.setItem('pedidosPizzaGurupi', JSON.stringify(pedidos));
  console.log('Pedido salvo localmente:', pedido);
}

// === Função: redireciona para WhatsApp com pedido ===
function enviarParaWhatsApp(pedidoTexto) {
  const numero = '55999900000000'; // substitua pelo número oficial com DDD
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(pedidoTexto)}`;
  window.open(url, '_blank');
  console.log('Pedido enviado para WhatsApp:', pedidoTexto);
}

// === Função: envia pedido para API simulada ===
async function enviarPedido(nomeProduto, preco) {
  const pedido = {
    produto: nomeProduto,
    preco,
    horario: new Date().toLocaleString()
  };

  try {
    // Simulando envio para uma API
    const response = await fetch('https://api.exemplo.com/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido)
    });

    if (!response.ok) throw new Error('Erro no envio para a API');

    alert(`✅ Pedido de "${nomeProduto}" confirmado!`);
    salvarPedidoLocal(pedido);

    const texto = `🍕 Pedido: ${nomeProduto} - ${preco}\n📅 Hora: ${pedido.horario}`;
    enviarParaWhatsApp(texto);
  } catch (error) {
    alert('❌ Não foi possível concluir o pedido agora. Tente novamente.');
    console.error('Erro no envio:', error);
  }
}

function carregarHistorico() {
  const pedidos = JSON.parse(localStorage.getItem('pedidosPizzaGurupi')) || [];
  const container = document.getElementById('lista-pedidos');
  container.innerHTML = '';

  if (pedidos.length === 0) {
    container.innerHTML = '<p>📭 Nenhum pedido ainda.</p>';
    return;
  }

  pedidos.reverse().forEach(p => {
    const div = document.createElement('div');
    div.className = 'pedido-item';
    div.innerHTML = `🍕 <strong>${p.produto}</strong> - ${p.preco} <br> 📅 ${p.horario}`;
    container.appendChild(div);
  });
}

// Chama assim que carregar a página
document.addEventListener('DOMContentLoaded', carregarHistorico);


function showToast(mensagem, tempo = 3000) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensagem;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, tempo);
}

// === Eventos para todos os botões "Pedir agora" ===
botoesPedir.forEach((botao) => {
  botao.addEventListener('click', (event) => {
    const info = event.target.closest('.info');
    const nomeProduto = info.querySelector('h3')?.textContent;
    const preco = info.querySelector('h4 span')?.textContent;
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(reg => console.log('✅ Service Worker registrado', reg))
      .catch(err => console.warn('❌ Erro no Service Worker', err));
  });
}

    if (nomeProduto && preco) {
      enviarPedido(nomeProduto, preco);
    } else {
    showToast(`✅ Pedido de "${nomeProduto}" confirmado!`);
    }
  });
});
