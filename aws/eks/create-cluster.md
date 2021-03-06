### Create k8s cluster by eksctl

```sh
[cloud_user@ip-10-192-10-173 ~]$ aws configure
AWS Access Key ID [None]: AKIAXY4KUBBNNRXQVXXI
AWS Secret Access Key [None]: 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
Default region name [None]: us-east-1
Default output format [None]:
```

> 配置 aws 命令行

```
[cloud_user@ip-10-192-10-173 ~]$ aws sts get-caller-identity
{
    "Account": "534477277274",
    "UserId": "AIDAXY4KUBBNGT5WNNDWB",
    "Arn": "arn:aws:iam::534477277274:user/cloud_user"
}
```

> 检查连接结果

```
[cloud_user@ip-10-192-10-173 ~]$ eksctl create cluster --region=us-east-1 --node-type=t2.medium
[ℹ]  eksctl version 0.11.1
[ℹ]  using region us-east-1
[ℹ]  setting availability zones to [us-east-1a us-east-1f]
[ℹ]  subnets for us-east-1a - public:192.168.0.0/19 private:192.168.64.0/19
[ℹ]  subnets for us-east-1f - public:192.168.32.0/19 private:192.168.96.0/19
[ℹ]  nodegroup "ng-79f30fc9" will use "ami-0392bafc801b7520f" [AmazonLinux2/1.14]
[ℹ]  using Kubernetes version 1.14
[ℹ]  creating EKS cluster "attractive-mushroom-1577347608" in "us-east-1" region with un-managed nodes
[ℹ]  will create 2 separate CloudFormation stacks for cluster itself and the initial nodegroup
[ℹ]  if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=us-east-1 --cluster=attractive-mushroom-1577347608'
[ℹ]  CloudWatch logging will not be enabled for cluster "attractive-mushroom-1577347608" in "us-east-1"
[ℹ]  you can enable it with 'eksctl utils update-cluster-logging --region=us-east-1 --cluster=attractive-mushroom-1577347608'
[ℹ]  Kubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster "attractive-mushroom-1577347608" in "us-east-1"
[ℹ]  2 sequential tasks: { create cluster control plane "attractive-mushroom-1577347608", create nodegroup "ng-79f30fc9" }
[ℹ]  building cluster stack "eksctl-attractive-mushroom-1577347608-cluster"
[ℹ]  deploying stack "eksctl-attractive-mushroom-1577347608-cluster"
```

> 创建 eks 集群(需要比较长的时间)

- 完成过后可以在`aws console/cloudformation`里看到对应的两个 stack
  - ec2 是通过 auto scaling group 自动创建的(AMI 是专用的 k8s node), eks 里看不到
- 本地会在写好对应的 kubeconfig, kubectl 可以直连集群

![img](https://s3.amazonaws.com/assessment_engine/production/labs/1343/lab_diagram_Amazon%20EKS%20Deep%20Dive%20-%20Learning%20Activities.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA3ETCCTRFNZRM6ZML%2F20191226%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20191226T075416Z&X-Amz-Expires=7200&X-Amz-SignedHeaders=host&X-Amz-Signature=eb27c473bccbebe914082c0e27f5189123a6afa9fc0967b2b35617ffc68e48f0)

### [Create k8s cluster by AWS management console](https://docs.aws.amazon.com/eks/latest/userguide/getting-started-console.html)

Before you can create an Amazon EKS cluster, you must create an IAM role that Kubernetes can assume to create AWS resources. For example, when a load balancer is created, Kubernetes assumes the role to create an Elastic Load Balancing load balancer in your account. This only needs to be done one time and can be used for multiple EKS clusters.

You must also create a VPC and a security group for your cluster to use. Although the VPC and security groups can be used for multiple EKS clusters, we recommend that you use a separate VPC for each EKS cluster to provide better network isolation.

This section also helps you to install the kubectl binary and configure it to work with Amazon EKS.

- Create your Amazon EKS Service Role
- Create your Amazon EKS Cluster VPC
- Install kubectl
- Install AWS CLI

- Create Your Amazon EKS Cluster
- Create a kubeconfig File
  - `aws eks --region region update-kubeconfig --name cluster_name`
- Launch a Managed Node Group
  - To create your Amazon EKS worker node IAM role
  - To launch your managed node group

## Command

```
aws eks update-kubeconfig --name <cluster_name> --profile <aws_profile> --region <cluster_region>
```
