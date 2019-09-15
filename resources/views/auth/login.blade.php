@extends('layouts.app')
@section('css')
    <link href="/css/page-login.css" rel="stylesheet">

@endsection
@section('js')
    <script src="{{ mix('js/login.js') }}" ></script>
	
@endsection
@section('content')
    <div id="login"></div>
@endsection