# Interest Rate Calculator WordPress Widget by [Calculator.iO](https://www.calculator.io/ "Calculator.iO Homepage")

Free online calculator to estimate the interest rate and total interest cost of an amortized loan with a fixed monthly repayment amount.

![Interest Rate Calculator Input Form](/assets/images/screenshot-1.png "Interest Rate Calculator Input Form")
![Interest Rate Calculator Calculation Results](/assets/images/screenshot-2.png "Interest Rate Calculator Calculation Results")

## Installation

1. [Download](https://github.com/pub-calculator-io/age-calculator/archive/refs/heads/master.zip) the ZIP file of this repository.
2. Upload the /interest-rate-calculator-master/ folder to the /wp-content/plugins/ directory.
3. Activate the [Interest Rate Calculator](https://www.calculator.io/interest-rate-calculator/ "Interest Rate Calculator Homepage") plugin through the "Plugins" menu in WordPress.

## Usage
* Add the shortcode `[ci_interest_rate_calculator]` to your page or post and configure default mortgage parameters.
* If you are using widgets, just add the Interest Rate Calculator to the sidebar through the `Appearance -> Widgets -> Interest Rate Calculator` menu in WordPress.
* Add the following code: `<?php display_ci_interest_rate_calculator(); ?>` to your template where you would like the Interest Rate Calculator to appear.

## Libraries in Use
1. https://mathjs.org/
2. https://katex.org/
3. https://github.com/aFarkas/lazysizes
4. https://github.com/RobinHerbots/Inputmask
5. https://air-datepicker.com/
6. https://www.chartjs.org/
