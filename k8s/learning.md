# Learning for K8s 

- Wasn't able to access the k8s dashboard. I tried port-forwarding through k9s to 

 ```bash
kubectl port-forward -n kubernetes-dashboard service/kubernetes-dashboard-kong-proxy 8443:443
```

> Note: previously I was port-forwarding the `svc/dashboard-web`


Http failure response for https://localhost:8443/api/v1/ingress/front-end?itemsPerPage=10&page=1&sortBy=d,creationTimestamp: 502 OK
