<?php
/*
Plugin Name: CI Interest rate calculator
Plugin URI: https://www.calculator.io/interest-rate-calculator/
Description: Free online calculator to estimate the interest rate and total interest cost of an amortized loan with a fixed monthly repayment amount.
Version: 1.0.0
Author: Interest Rate Calculator / www.calculator.io
Author URI: https://www.calculator.io/
License: GPLv2 or later
Text Domain: ci_interest_rate_calculator
*/

if (!defined('ABSPATH')) exit;

if (!function_exists('add_shortcode')) return "No direct call for Interest Rate Calculator by www.calculator.io";

function display_calcio_ci_interest_rate_calculator(){
    $page = 'index.html';
    return '<h2><img src="' . esc_url(plugins_url('assets/images/icon-48.png', __FILE__ )) . '" width="48" height="48">Interest Rate Calculator</h2><div><iframe style="background:transparent; overflow: scroll" src="' . esc_url(plugins_url($page, __FILE__ )) . '" width="100%" frameBorder="0" allowtransparency="true" onload="this.style.height = this.contentWindow.document.documentElement.scrollHeight + \'px\';" id="ci_interest_rate_calculator_iframe"></iframe></div>';
}


add_shortcode( 'ci_interest_rate_calculator', 'display_calcio_ci_interest_rate_calculator' );