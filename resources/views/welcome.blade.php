<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimal-ui">

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


    <style>
        body {
            background-color: #E3F2FD;
        }

        body .wrapper {
            min-height: 100vh;
            position: relative;
        }

        .wrapper {
            position: relative;
            top: 0;
            height: 100vh;
        }

        .fixedcenter {
            text-align: center;
            display: block;
        }

        .clockwrapper {
            position: relative;
        }

        .clockinout {
            padding: 5px;
            background: white;
            border-radius: 7px;
            display: inline-block;
            margin-top: 5%;
        }

        .btnclock.active {
            background: #03A9F4;
            color: white;
            outline: none;
        }

        .btnclock {
            border: 0px;
            padding: 6px 38px;
            border-radius: 5px;
            color: #9E9E9E;
            font-size: 16px;
            background: transparent;
            outline: none;
        }

        .btnclock:hover,
        .btnclock:focus {
            outline: none;
        }

        .timeclock {
            margin-top: 30px;
            width: 310px;
            height: 310px;
            border-radius: 50%;
            background: #2196F3;
            display: inline-block;
            border: 10px solid #B2EBF2
        }

        .timeclock span {
            display: block;
        }

        .clock-text {
            margin-top: 90px;
            color: #f4f4f4;
            font-family: Helvetica Neue;
            font-size: 42px;
            font-weight: 300;
            text-transform: uppercase;
        }

        .clock-time {
            padding: 30px 0px;
            font-size: 27px;
            color: #424242;
        }

        span.clock-day {
            color: white;
            font-size: 26px;
        }

        .userinput {
            position: relative;
            display: inline-block;
            margin-top: 20px;
        }

        .userinput .col-md-2 {
            width: 16.66666667%;
            float: left;
        }

        .userinput .col-md-7 {
            width: 58.33333333%;
            float: left;
        }

        .userinput .col-md-3 {
            width: 25%;
            float: left;
        }

        .userinput div {
            padding: 0px;
        }

        .userinput label {
            line-height: 3em;
        }

        .userinput button {
            line-height: 1.9em;
            margin-left: 5px;
        }

        .form-control.border-input {
            border-bottom: 1px solid #bcbcbc;
            padding-left: 0px;
            border-radius: 0px;
            text-transform: capitalize;
        }

        .form-control,
        .border-input {
            background: none;
            font-size: 18px;
            color: #373737;
        }

        .message-after {
            max-width: 320px;
            margin: 0 auto;
            padding: 12px 8px;
            margin-top: 15px;
            border-radius: 5px;
            background: #ffffff;
            border: 1px solid #B2EBF2;
            box-shadow: 0px 2px 2px 0px #b2ebf2;
            display: none;
            font-size: 16px;
        }

        .uppercase {
            text-transform: uppercase !important;
        }

        textarea.lightblue {
            background-color: #B2EBF2 !important;
            border: 1px solid #81D4FA !important;
            color: #006064 !important;
        }

        textarea::placeholder {
            color: #006064 !important;
        }

        .enter_idno {
            border-color: #87c9ff !important;
            font-size: 16px !important;
        }

        .enter_idno::placeholder {
            color: #006064 !important
        }

        #btnclockin {
            margin: 1px 0 0 -10px;
            float: right;
        }

        #clocktime {
            color: #388E3C;
        }

        .ok {
            background: #ffffff;
            border: 1px solid #A5D6A7;
            border-bottom: 3px solid #21ba45;
        }

        .notok {
            border: 1px solid #FFCDD2;
            border-bottom: 3px solid #db2828;
            background: #FFEBEE;
        }

        #fullname {
            text-transform: uppercase;
            font-weight: 600;
        }

        img.wave {
            position: fixed;
            bottom: 0;
            right: 0;
            width: 100%;
            height: auto;
            z-index: -10;
        }

        @media (max-width: 390px) {
            .timeclock {
                margin-top: 30px;
                width: 280px;
                height: 280px;
            }

            .clock-text {
                margin-top: 70px;
                font-size: 36px;
            }

            .clock-time {
                padding: 30px 0px;
                font-size: 27px;
            }

            span.clock-day {
                font-size: 24px;
            }
        }

        @media (max-width: 320px) {
            .clockwrapper .userinput .inline.field>label.small {
                display: none;
            }
        }
        #particles-js {
            background-color: #E3F2FD;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -10;
        }
    </style>
    <link rel="stylesheet" href="/css/semantic.min.css">
</head>
<body>
<img src="" class="wave">
<div id="clock"></div>
<script src="/js/vendors.bundle.js"></script>
<script src="/js/app.bundle.js"></script>
<script src="/js/clock.js"></script>

</body>
</html>