#include<bits/stdc++.h>
using namespace std;
int main() {
	int a, b;
	cin>>a>>b;
	
	for(int i = 0; i < 10000; i++)
		a += i;
	
	cout<<a<<"\n";
}
