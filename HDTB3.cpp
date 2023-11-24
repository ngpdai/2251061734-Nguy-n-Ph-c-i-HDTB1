#include <iostream>
#include <vector>
#include <cmath>
using namespace std;
const int N = 50005;
int n, q, a[N], t[N<<2];

class TMax {
private:
    vector<int> a;
    vector<int> t;
    int n;

    void biendoi(int k, int l, int r) {
        if (l == r) {
            t[k] = a[l];
            return;
        }
        int m = (l + r) >> 1;
        biendoi(k << 1, l, m);
        biendoi(k * 2 + 1, m + 1, r);
        t[k] = max(t[k << 1], t[k * 2 + 1]);
    }

    int findMax(int k, int l, int r, int L, int R) {
        if (r < L || R < l)
            return 0;
        if (L <= l && r <= R)
            return t[k];
        int m = (l + r) >> 1;
        return max(findMax(k << 1, l, m, L, R), findMax(k * 2 + 1, m + 1, r, L, R));
    }

public:
    TMax(int size) {
        n = size;
        a.resize(n + 1, 0);
        t.resize(4 * n, 0);
    }

    void fix(int l, int r, int k) {
        a[l] += k;
        if (r + 1 <= n)
            a[r + 1] -= k;
    }

    void b() {
        for (int i = 2; i <= n; i++)
            a[i] += a[i - 1];
        biendoi(1, 1, n);
    }

    int getMax(int l, int r) {
        return findMax(1, 1, n, l, r);
    }
};

int main() {
    int n, q;
    cin >> n >> q;

    TMax tmax(n);

    while (q--) {
        int l, r, k;
        cin >> l >> r >> k;
        tmax.fix(l, r, k);
    }

    tmax.b();

    int p;
    cin >> p;

    while (p--) {
        int l, r;
        cin >> l >> r;
        int maxVal = tmax.getMax(l, r);
        cout << maxVal << endl;
    }
    return 0;
}