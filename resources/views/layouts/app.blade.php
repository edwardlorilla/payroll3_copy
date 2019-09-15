<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Payroll') }}</title>
    <meta name="description" content="payroll">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="msapplication-tap-highlight" content="no">
    <link rel="stylesheet" media="screen, print" href="/css/vendors.bundle.css">
    <link rel="stylesheet" media="screen, print" href="/css/app.bundle.css">
    @yield('css')
    <link rel="apple-touch-icon" sizes="57x57" href="/img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="/img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="144x144"  href="/img/favicon/android-icon-144x144.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png">
    <link rel="manifest" href="/img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#5bbad5">
    <meta name="msapplication-TileImage" content="/img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#5bbad5">
</head>
<body class="mod-bg-1 ">

<script>
    /**
     *	This script should be placed right after the body tag for fast execution
     *	Note: the script is written in pure javascript and does not depend on thirdparty library
     **/
    'use strict';

    var classHolder = document.getElementsByTagName("BODY")[0],
        /**
         * Load from localstorage
         **/
        themeSettings = (localStorage.getItem('themeSettings')) ? JSON.parse(localStorage.getItem('themeSettings')) :
            {},
        themeURL = themeSettings.themeURL || '',
        themeOptions = themeSettings.themeOptions || '';
    /**
     * Load theme options
     **/
    if (themeSettings.themeOptions)
    {
        classHolder.className = themeSettings.themeOptions;
        console.log("%c✔ Theme settings loaded", "color: #148f32");
    }
    else
    {
        console.log("Heads up! Theme settings is empty or does not exist, loading default settings...");
    }
    if (themeSettings.themeURL && !document.getElementById('mytheme'))
    {
        var cssfile = document.createElement('link');
        cssfile.id = 'mytheme';
        cssfile.rel = 'stylesheet';
        cssfile.href = themeURL;
        document.getElementsByTagName('head')[0].appendChild(cssfile);
    }
    /**
     * Save to localstorage
     **/
    var saveSettings = function()
    {
        themeSettings.themeOptions = String(classHolder.className).split(/[^\w-]+/).filter(function(item)
        {
            return /^(nav|header|mod|display)-/i.test(item);
        }).join(' ');
        if (document.getElementById('mytheme'))
        {
            themeSettings.themeURL = document.getElementById('mytheme').getAttribute("href");
        };
        localStorage.setItem('themeSettings', JSON.stringify(themeSettings));
    }
    /**
     * Reset settings
     **/
    var resetSettings = function()
    {
        localStorage.setItem("themeSettings", "");
    }
</script>
<div class="content">
    @yield('content')
</div>
<script>
          if ('serviceWorker' in navigator ) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                    // Registration was successful
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
</script>
<script src="/js/vendors.bundle.js"></script>
<script src="/js/app.bundle.js"></script>
@yield('js')
</body>
</html>