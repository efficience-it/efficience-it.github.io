(function() {
    const script = document.createElement('script');
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-N5DRJXDRDC";
    script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('js', new Date());
        gtag('config', 'G-N5DRJXDRDC', { anonymize_ip: true, storage: 'none' });
    };
    document.head.appendChild(script);
})();
