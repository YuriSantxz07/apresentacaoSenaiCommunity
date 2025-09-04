// /FrontEnd/Perfil/JS/perfil.js

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove a classe 'active' de todas as abas e conteúdos
            tabs.forEach(item => item.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Adiciona a classe 'active' à aba clicada
            tab.classList.add('active');
            
            // Mostra o conteúdo correspondente
            const activeTabContent = document.getElementById(tab.dataset.tab);
            if (activeTabContent) {
                activeTabContent.classList.add('active');
            }
        });
    });
});