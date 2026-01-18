function showView(viewName) {
    const views = ['home', 'projects', 'blogs', 'blog-post'];
    
    views.forEach(view => {
        const el = document.getElementById(`${view}-view`);
        if (view === viewName) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    window.scrollTo(0,0);
}
