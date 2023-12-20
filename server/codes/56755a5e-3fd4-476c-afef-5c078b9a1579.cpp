#include<bits/stdc++.h>
using namespace std;
int main() {
	int a, b, x = 0;
	cin>>a>>b;
	
	for(int i = 0; i < 10000; i++)
		x += i;
	
	cout<<a + b<<"\n";
}
