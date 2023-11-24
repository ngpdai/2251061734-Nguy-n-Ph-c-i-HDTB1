#include <iostream>
#include <sstream>
using namespace std;
class Calculator {
private:
    int A;
    int B;

public:
    Calculator(int a, int b) {
        A = a;
        B = b;
    }

    int add() {
        return A + B;
    }
};

int main(){
    string input;
    getline(cin, input);
    istringstream iss(input);
    int a, b;
    if (iss >> a >> b) {
        Calculator calculator(a, b);
        int sum = calculator.add();

        cout << "" << sum << std::endl;
    } 

    return 0;
}


