
import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import InputField from "./components/InputField"
import SelectField from "./components/SelectField"

import { IUser } from "./type"
import { toast } from "react-toastify"
import CheckboxField from "./components/CheckboxField"
import UserList from "./components/UserList"

interface IFormInput {
  first_name: string,
  last_name: string,
  email: string,
  address: string,
  city: string,
  country: string,
  state: string,
  billing: boolean,
  role: string
}

export interface IMetadata {
  limit: number,
  page: number,
  total: number
}

function App() {
  const [dataSource, setDataSource] = React.useState<IUser[] | null>(null);
  const [userId, setUserId] = React.useState<string | null>('');
  const [metadata, setMetadata] = React.useState<IMetadata | null>(null)
  const { 
    control, 
    handleSubmit, 
    reset,
    setValue,
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      city: "",
      country: "",
      state: "",
      role: "",
      billing: false
    },
  });

  // fetch user
  React.useEffect(() => {
    async function fetchUser() {
      const res = await fetch('https://tony-auth-express-vdee.vercel.app/api/user?page=1&limit=1000');
      const data = await res.json();
      const users = data.data.map((item: IUser) => {
        return {
          ...item,
          first_name: item.first_name,
          last_name: item.last_name,
          address: item.address,
          email: item.email,
          city: item.city,
          country: item.country,
          state: item.state,
          role: item.role,
        }
      })
      setDataSource(users);
      setMetadata({
        limit: data.limit,
        page: data.page,
        total: data.total
      })
    }
    fetchUser();
  }, [])

  const onNextPage = () => {
     console.log('onNextPage')
    setMetadata(prevState => {
      return {
        ...prevState,
        page: (prevState?.page || 0) + 1
      }
    })
  }

  const onPrevPage = () => {
    setMetadata(prevState => {
      return {
        ...prevState,
        page: (prevState?.page || 0) - 1
      }
    })
  }

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // mode: add
    if (!userId) {
      try {
        const newItem = {
          id: Date.now(),
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          address: data.address,
          city: data.city,
          country: data.country,
          state: data.state,
          role: data.role
        }
        const bodyData = {
          data: {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            role: data.email,
            state: data.state,
            country: data.country,
            address: data.address,
            city: data.city,
            password: '123456',
          }
        }
        // call api to create new user
        await fetch('https://tony-auth-express-vdee.vercel.app/api/user/signup', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(bodyData)
        });
        const newDatasource = [...dataSource || [], newItem];
        setDataSource(newDatasource as IUser[]);
        reset();
  
        toast.success('Add Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      } catch (err) {
        toast.error('Can not add new item', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
      }
      
      return;
    } 

    if (!dataSource) return;
      
    // mode: edit
    const indexUser = dataSource.findIndex(item => item.id === userId);
    
    if (indexUser === -1 ) return;
    dataSource[indexUser].first_name = data.first_name;
    dataSource[indexUser].last_name = data.last_name;
    dataSource[indexUser].email = data.email;
    dataSource[indexUser].address = data.address;
    dataSource[indexUser].city = data.city;
    dataSource[indexUser].country = data.country;
    dataSource[indexUser].state = data.state;
    dataSource[indexUser].role = data.role;
    dataSource[indexUser].billing = data.billing;

    setDataSource(dataSource as IUser[]);
    reset();

    toast.success('Update Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "light",
    });
  }

  function handleEdit(id: string) {
    if (!dataSource) return;

    setUserId(id);

    const user = dataSource.find(item => item.id === id);
    if (!user) return;

    setValue('first_name', user.first_name)
    setValue('last_name', user.last_name)
    setValue('email', user.email)
    setValue('address', user.address)
    setValue('city', user.city)
    setValue('country', user.country)
    setValue('state', user.state)
    setValue('role', user.role)
    setValue('billing', user.billing)
  }

  async function handleDelete(id: string) {
    if (!dataSource) return;

    try {
      const response = await fetch(`https://tony-auth-express-vdee.vercel.app/api/user/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (!data.isSucess) {
        toast.error('Can not delete', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          theme: "light",
        });
        return;
      }
      const newUsers = dataSource.filter(item => item._id !== id);
      setDataSource(newUsers);
      
      toast.success('Delete Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    } catch (err) {
      toast.error('Can not delete', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        theme: "light",
      });
    }
  }

 
  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600">Responsive Form</h2>
          <p className="text-gray-500 mb-6">
            Form is mobile responsive. Give it a try.
          </p>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="font-medium text-lg">Personal Details</p>
                <p>Please fill out all the fields.</p>
              </div>
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-3">
                      <Controller
                        name="first_name"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                            maxLength: {
                              value: 20,
                              message: 'Please input value maxium 20'
                            },
                            minLength: {
                              value: 6,
                              message: 'Please input value minium 6'
                            }
                          }
                        }
                        render={({ field }) => (
                          <InputField 
                            id="first_name"
                            label="First Name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.first_name?.message && (
                        <div className="text-red-500">{errors.first_name.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Controller
                        name="last_name"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                            maxLength: {
                              value: 20,
                              message: 'Please input value maxium 20'
                            },
                            minLength: {
                              value: 6,
                              message: 'Please input value minium 6'
                            }
                          }
                        }
                        render={({ field }) => (
                          <InputField 
                            id="last_name"
                            label="Last Name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.last_name?.message && (
                        <div className="text-red-500">{errors.last_name.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <Controller
                        name="email"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                            pattern: {
                              value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                              message: 'Email format wrong. Ex: tony@gmail.com'
                            },
                          }
                        }
                        render={({ field }) => (
                          <InputField 
                            id="email"
                            label="Email Address"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.email?.message && (
                        <div className="text-red-500">{errors.email.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <Controller
                        name="address"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                          }
                        }
                        render={({ field }) => (
                          <InputField 
                            id="address"
                            label="Address / Street"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.address?.message && (
                        <div className="text-red-500">{errors.address.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Controller
                        name="city"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                          }
                        }
                        render={({ field }) => (
                          <InputField 
                            id="city"
                            label="City"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.city?.message && (
                        <div className="text-red-500">{errors.city.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-3">
                      <Controller
                        name="country"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                          }
                        }
                        render={({ field }) => (
                          <SelectField 
                            id="country"
                            label="Country / region"
                            options={
                              [
                                { label: 'United States', value: 'US' },
                                { label: 'Canada', value: 'CA' },
                                { label: 'Vietnam', value: 'VN' }
                              ]
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.country?.message && (
                        <div className="text-red-500">{errors.country.message}</div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <Controller
                        name="state"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                          }
                        }
                        render={({ field }) => (
                          <SelectField 
                            id="state"
                            label="State/ provice"
                            options={
                              [
                                { label: 'Phu Nhuan', value: 'Phu Nhuan' },
                                { label: 'Q1', value: 'Q1' },
                                { label: 'Q3', value: 'Q3' }
                              ]
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.state?.message && (
                        <div className="text-red-500">{errors.state.message}</div>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Controller
                        name="state"
                        control={control}
                        rules={
                          {
                            required: 'Please input field',
                          }
                        }
                        render={({ field }) => (
                          <SelectField 
                            id="role"
                            label="Role"
                            options={
                              [
                                { label: 'Admin', value: 'admin' },
                                { label: 'Operator', value: 'operator' },
                                { label: 'Member', value: 'member' }
                              ]
                            }
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.role?.message && (
                        <div className="text-red-500">{errors.role.message}</div>
                      )}
                    </div>

                    <div className="md:col-span-5">
                      <div className="">
                        <Controller
                          name="billing"
                          control={control}
                          render={({ field }) => (
                            <CheckboxField 
                              id="billing"
                              label="My billing address is different than above."
                              {...field}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container max-w-screen-lg mx-auto w-full relative overflow-x-auto">
        <UserList 
          dataSource={dataSource || []}
          metadata={metadata}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          onNextPage={onNextPage}
          onPrevPage={onPrevPage}
        />
      </div>
    </div>
  )
}

export default App