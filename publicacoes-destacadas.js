function carregarPublicacoes() {
  var listaPublicacoesDestacadas = document.getElementById('publicacoes-destacadas');
  var listaOutrasPublicacoes = document.getElementById('outras-publicacoes');

  // Query para buscar todas as publicações
  var query = 'https://www.borapracima.pro/feeds/posts/default?alt=json';

  // Requisição AJAX para buscar as publicações
  var xhr = new XMLHttpRequest();
  xhr.open('GET', query, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var data = JSON.parse(xhr.responseText);
      var entries = data.feed.entry;

      if (entries) {
        for (var i = 0; i < entries.length; i++) {
          var postTitle = entries[i].title.$t;
          var postURL = entries[i].link[4].href;

          // Verifique se a publicação possui a etiqueta "destaque"
          var isDestaque = false;
          if (entries[i].category) {
            for (var j = 0; j < entries[i].category.length; j++) {
              if (entries[i].category[j].term == 'destaque') {
                isDestaque = true;
                break;
              }
            }
          }

          // Crie uma entrada de lista para cada publicação
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = postURL;
          link.textContent = postTitle;
          listItem.appendChild(link);

          // Adicione a entrada na lista apropriada (destacadas ou outras)
          if (isDestaque) {
            listaPublicacoesDestacadas.appendChild(listItem);
          } else {
            listaOutrasPublicacoes.appendChild(listItem);
          }
        }
      } else {
        // Se nenhuma publicação for encontrada
        listaOutrasPublicacoes.innerHTML = 'Nenhuma publicação encontrada.';
      }
    }
  };
  xhr.send();
}

// Chame a função para carregar as publicações
carregarPublicacoes();
