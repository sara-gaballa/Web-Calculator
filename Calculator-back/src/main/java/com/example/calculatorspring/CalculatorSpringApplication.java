package com.example.calculatorspring;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
@SpringBootApplication
@CrossOrigin
@Controller
public class CalculatorSpringApplication {
	@RequestMapping("/hello")
	@ResponseBody
	public static double mainOP(@RequestParam String num1) {
		return new Object() {//getting object from startParse
			int pos =-1, ch;
			void nextChar () {//obtain the next char or operation and check it is within range
				if (++pos < num1.length()) {
					ch = num1.charAt(pos);} else { ch = -1; } }
			boolean atChar(int OpChar){//check that this (OpChar) is the operation wanted
				if (ch == OpChar) {
					nextChar();return true;}
				return false;
			}
			double startParse() {//the main start function of the parse
				nextChar();
				return parse_term();
			}
			double parse_term() {//this method parse the terms needed for the operations
				double x = parse_factor();//getting (left operand) needed to operate on
				while (true){
					if (atChar('+')) x += parse_factor(); // addition-right operand is called using parse_factor()
					else if (atChar('-')) x -= parse_factor(); // subtraction-right operand is called using parse_factor()
					else if (atChar('×')) x *= parse_factor(); // multiplication-right operand is called using parse_factor()
					else if (atChar('/')) x /= parse_factor(); // division-right operand is called using parse_factor()
					else return x; }}
			double parse_factor() {
				if (atChar('+')) return +parse_factor(); // unary plus
				if (atChar('-')) return -parse_factor(); // unary minus
				double x;
				int startPos = this.pos;
				while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();// numbers and decimal reading to get left or right operand
				x = Double.parseDouble(num1.substring(startPos, this.pos));
				//unary operations calculations (they are preformed on the x directly if their OP found)
				if (atChar('⅟')) x = 1 / x;
				else if (atChar('%')) x = x / 100.0;
				else if (atChar('²')) x = x * x;
				else if (atChar('√')) {x = Math.sqrt(x);}
				else if (atChar('±')) {x = x * -1;}
				return x; }}.startParse();
	}
	public static void main(String[] args) {//the main of the spring boot application
		SpringApplication.run(CalculatorSpringApplication.class, args);
	}
}
