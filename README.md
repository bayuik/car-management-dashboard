# Car Management Dashboard
![alt text](https://github.com/bayuik/car-management-dashboard/blob/main/ERD/ERD.png)

# Endpoint
### Get all cars list
http://localhost:3000/cars

##### Example request Body
```
var config = {
  method: 'get',
  url: 'http://localhost:3000/cars',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
##### Output examples
```
[
    {
        "id": 110,
        "name": "Tesla",
        "price": 100000,
        "size": "medium",
        "image": "image-1650551219513-831285597",
        "createdAt": "2022-04-21T14:26:59.518Z",
        "updatedAt": "2022-04-21T14:28:45.440Z"
    },
    {
        "id": 109,
        "name": "Porsche",
        "price": 150000,
        "size": "medium",
        "image": "image-1650550515072-3971406",
        "createdAt": "2022-04-21T14:15:15.081Z",
        "updatedAt": "2022-04-21T14:28:37.461Z"
    }
]
```

---

### Get car by id
http://localhost:3000/cars/110


##### Example request body
```
var config = {
  method: 'get',
  url: 'http://localhost:3000/cars/111',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

##### Output Example
```
{
    "id": 110,
    "name": "Tesla",
    "price": 100000,
    "size": "medium",
    "image": "image-1650551219513-831285597",
    "createdAt": "2022-04-21T14:26:59.518Z",
    "updatedAt": "2022-04-21T14:28:45.440Z"
}
```
---

### Get car by size
http://localhost:3000/cars/filter/medium
##### Example request body
```
var config = {
  method: 'get',
  url: 'http://localhost:3000/cars/filter/small',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
##### Output Examples
```
[
    {
        "id": 109,
        "name": "Porsche",
        "price": 150000,
        "size": "medium",
        "image": "image-1650550515072-3971406",
        "createdAt": "2022-04-21T14:15:15.081Z",
        "updatedAt": "2022-04-21T14:28:37.461Z"
    }
]
```
---

### Post car
http://localhost:3000/cars

##### Example request body
```
var data = new FormData();
data.append('name', 'Porsche');
data.append('price', '200000');
data.append('size', 'small');
data.append('image', fs.createReadStream('/C:/Users/bayui/Pictures/242030506_1182991045518652_4803178363987901143_n.jpg'));

var config = {
  method: 'post',
  url: 'http://localhost:3000/cars',
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
##### Example output
```
{
    "message": "Car created"
}
```
---

### Put car
http://localhost:3000/cars/110

##### Example request body
```
var data = new FormData();
data.append('name', 'Porsche');
data.append('price', '200000');
data.append('size', 'medium');
data.append('image', fs.createReadStream('/C:/Users/bayui/Pictures/242030506_1182991045518652_4803178363987901143_n.jpg'));

var config = {
  method: 'put',
  url: 'http://localhost:3000/cars/109',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```


##### Example output
```
{
    "message": "Car updated"
}
```

---
### Delete car
http://localhost:3000/cars/110
##### Example request body
```
var config = {
  method: 'delete',
  url: 'http://localhost:3000/cars/48',
  headers: { }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```

Example Output
```
{
    "message": "Car deleted successfully"
}
```
