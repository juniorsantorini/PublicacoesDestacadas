function carregarPublicacoesDestacadas() {
  var publicacoesDestacadas = document.getElementById('publicacoes-destacadas');

  // Query para buscar publicações com a etiqueta "destaque"
  var query = 'https://www.borapracima.pro/feeds/posts/default/-/destaque?alt=json';

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

          // Crie uma entrada de lista para cada publicação em destaque
          var listItem = document.createElement('li');
          var link = document.createElement('a');
          link.href = postURL;
          link.textContent = postTitle;
          listItem.appendChild(link);

          publicacoesDestacadas.appendChild(listItem);
        }
      } else {
        publicacoesDestacadas.innerHTML = 'Nenhuma publicação em destaque encontrada.';
      }
    }
  };
  xhr.send();
}

// Chame a função para carregar as publicações em destaque
carregarPublicacoesDestacadas();
