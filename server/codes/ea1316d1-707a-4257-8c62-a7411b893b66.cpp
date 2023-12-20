#include <iostream>
#include <stdio.h>
using namespace std;
int main() {
	int a, b;
	cin>>a>>b;
  for(long long i = 0; i < (long long) 1e18; i++)
	{
			a = (a << ((i) % ((int)1e9 + 7))));
			b += a;
	}
	cout<<a<<" "<<b<<"\n";
}
