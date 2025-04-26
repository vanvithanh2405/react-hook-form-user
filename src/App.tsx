
import React from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"

import InputField from "./components/InputField"
import SelectField from "./components/SelectField"
import Table from "./components/Table"

import { IUser } from "./type"
import { toast } from "react-toastify"

interface IFormInput {
  full_name: string,
  email: string
}

function App() {
  const [dataSource, setDataSource] = React.useState<IUser[] | null>(null);
  const { 
    control, 
    handleSubmit, 
    formState: {
      errors
    }
  } = useForm({
    defaultValues: {
      full_name: "",
      email: ""
    },
  })

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const newItem = {
      full_name: data.full_name,
      email: data.email,
      address: {
        name: 'xxx'
      }
    }
    const newDatasource = [...dataSource || [], newItem];
    setDataSource(newDatasource as IUser[]);

    toast.success('Add Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      theme: "light",
    });
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
                    <div className="md:col-span-5">
                      <Controller
                        name="full_name"
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
                            id="full_name"
                            label="Full Name"
                            {...field}
                          />
                        )}
                      />
                      {errors && errors.full_name?.message && (
                        <div className="text-red-500">{errors.full_name.message}</div>
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
                      <InputField 
                        id="address"
                        label="Address / Street"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <InputField 
                        id="city"
                        label="City"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <SelectField 
                        id="countries"
                        label="Country / region"
                        options={
                          [
                            { label: 'United States', value: 'US' },
                            { label: 'Canada', value: 'CA' },
                            { label: 'Vietnam', value: 'VN' }
                          ]
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
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
                      />
                    </div>
                    <div className="md:col-span-5">
                      <div className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="billing_same"
                          id="billing_same"
                          className="form-checkbox"
                        />
                        <label htmlFor="billing_same" className="ml-2">
                          My billing address is different than above.
                        </label>
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
        <Table 
          tableHeaders={['Full Name', 'Email Address', 'Address', 'City', 'Country', 'State']}
          dataSource={dataSource || []}
          renderRow={(data: IUser) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {data.full_name}
                </th>
                <td className="px-6 py-4">{data.email}</td>
                <td className="px-6 py-4">{data.address.name}</td>
                <td className="px-6 py-4">{data.city}</td>
                <td className="px-6 py-4">{data.country}</td>
                <td className="px-6 py-4">{data.state}</td>
              </tr>
            )
          }}
        />
      </div>
    </div>
  )
}

export default App


/*
users = [
  { 
    id: 1,
    full_name: xxx,
    last_name: xxx,
    age: xxx,
    dob: xxx,
    city: xx,
    addess: {
      name: xxx,
    },
    email: xxx
  }
]
*/